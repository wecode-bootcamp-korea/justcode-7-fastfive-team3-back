import myDataSource from './index';

const getCountOfAllComments = async (feedId: number) => {
  return await myDataSource.query(
    `
        SELECT COUNT(*) AS reply_cnt
        FROM replies r
        WHERE feed_id = ?
    `,
    [feedId]
  );
};

const queryForGetListOfRepliesByFeed = `
       SELECT t2.id   AS reply_id,
                 t2.feed_id,
                 u2.id   AS feed_user_id,
                 t2.is_private,
                 t2.is_deleted,
                 t2.comment,
                 t2.parent_reply_id,
                 u3.id   AS parent_user_id,
                 t2.reply_group,
                 t2.rnk,
                 u.id    AS reply_user_id,
                 ug.company_name,
                 u.nickname,
                 u.email,
                 u.position_name,
                 u.is_admin,
                 CASE
                     WHEN instr(DATE_FORMAT(t2.created_at, '%Y년 %m월 %d일 %p %h:%i'), 'PM') > 0
                         THEN
                         REPLACE(DATE_FORMAT(t2.created_at, '%Y년 %m월 %d일 %p %h:%i'),
                                 'PM',
                                 '오후')
                     ELSE
                         REPLACE(DATE_FORMAT(t2.created_at, '%Y년 %m월 %d일 %p %h:%i'), 'AM', '오전')
                     END AS created_at
          FROM (SELECT *
                FROM (SELECT r.id,
                             r.is_private,
                             r.is_deleted,
                             r.user_id,
                             r.feed_id,
                             r.comment,
                             r.parent_reply_id,
                             r.created_at,
                             RANK() OVER (PARTITION BY parent_reply_id
                                 ORDER BY
                                     id ASC)   AS rnk,
                             r.parent_reply_id AS reply_group
                      FROM replies r
                      WHERE feed_id = ?
                        AND parent_reply_id) AS t1
                UNION ALL
                (SELECT r2.id,
                        r2.is_private,
                        r2.is_deleted,
                        r2.user_id,
                        r2.feed_id,
                        r2.comment,
                        r2.parent_reply_id,
                        r2.created_at,
                        r2.parent_reply_id AS rnk,
                        r2.id              AS reply_group
                 FROM replies r2
                 WHERE r2.feed_id = ?
                   AND r2.parent_reply_id = 0
                 ORDER BY r2.id ASC)) AS t2
                   INNER JOIN users u ON
              t2.user_id = u.id
                   LEFT JOIN replies r3 ON
              r3.id = t2.parent_reply_id
                   LEFT JOIN users u3 ON
              u3.id = r3.user_id
                   LEFT JOIN user_group ug ON
              ug.id = u.group_id
                   LEFT JOIN feeds f ON
              f.id = t2.feed_id
                   LEFT JOIN users u2 ON
              f.user_id = u2.id
          ORDER BY reply_group,
                   rnk
`;
const findReplyIndex = async (replyId: number, feedId: number) => {
  return await myDataSource
    .query(
      `
    ${queryForGetListOfRepliesByFeed}
    `,
      [feedId, feedId]
    )
    .then(value => {
      return value.findIndex((e: any) => e.reply_id === replyId);
    });
};
const getListOfRepliesByFeed = async (
  userId: number,
  feedId: number,
  pagenation?: string
) => {
  return await myDataSource
    .query(
      `
    ${queryForGetListOfRepliesByFeed}
    ${pagenation}
    `,
      [feedId, feedId, pagenation]
    )
    .then(value => {
      value.map((e: any) => {
        if (value[0].parent_reply_id !== 0) {
          let temporary = {
            reply_id: e.parent_reply_id,
            parent_reply_id: 0,
            is_fake: true,
          };
          value.unshift(temporary);
        }
        return value;
      });

      value = [...value].map(item => {
        return {
          ...item,
          is_private: item.is_private === 1,
          is_deleted: item.is_deleted === 1,
          comment: item.comment === '0' ? false : item.comment,
          reply: [],
        };
      });

      value
        .filter(
          (e: any) =>
            e.is_private === true &&
            (e.reply_user_id || e.parent_user_id || e.feed_user_id) !== userId
        )
        .map((e: any) => {
          e.comment = false;
          return e;
        });

      value
        .filter((e: any) => e.parent_reply_id !== 0)
        .forEach((e: any) =>
          value
            .find((re: any) => re.reply_id === e.parent_reply_id)
            .reply.push(e)
        );

      return value.filter((e: any) => e.parent_reply_id === 0);
    });
};

const createReply = async (
  userId: number,
  feedId: number,
  comment: string,
  parentReplyId: number,
  isPrivate: boolean
) => {
  await myDataSource.query(
    `
    INSERT
      replies SET
      user_id = ${userId},
      feed_id = ${feedId},
      comment = '${comment}',
      parent_reply_id = ${parentReplyId},
      is_private = ${isPrivate}
    `
  );

  return await myDataSource.query(
    `
        SELECT r.id,
               r.is_private,
               r.user_id,
               ug.company_name,
               u.nickname,
               u.email,
               u.position_name,
               r.feed_id,
               r.comment,
               r.parent_reply_id,
               SUBSTRING(r.created_at, 1, 16) AS created_at
        FROM replies r
                 JOIN users u ON
            r.user_id = u.id
                LEFT JOIN user_group ug ON
            ug.id = u.group_id
        WHERE r.user_id = ? AND r.feed_id = ?
        ORDER BY created_at DESC
        LIMIT 1
    `,
    [userId, feedId]
  );
};

const findReply = async (replyId: number) => {
  return await myDataSource.query(
    `
        SELECT r.id,
               r.user_id,
               u.nickname                     AS reply_user,
               r.is_private,
               r.comment,
               u2.nickname                    AS parent_reply_user,
               u2.email                       AS parent_reply_user_mail,
               u3.nickname                    AS feed_user,
               u3.email                       AS feed_user_email,
               SUBSTRING(r.created_at, 1, 16) AS created_at
        FROM replies r
                 LEFT JOIN replies r2 ON
            r2.id = r.parent_reply_id
                 LEFT JOIN users u ON
            u.id = r.user_id
                 LEFT JOIN users u2 ON
            u2.id = r2.user_id
                 LEFT JOIN feeds f ON
            f.id = r.feed_id
                 LEFT JOIN users u3 ON
            u3.id = f.user_id
        WHERE r.id = ?
    `,
    [replyId]
  );
};
const updateReply = async (
  replyId: number,
  comment: string,
  isPrivate?: string
) => {
  await myDataSource.query(
    `
    UPDATE
      replies SET
      comment = '${comment}'
      ${isPrivate}
    WHERE
      id = ${replyId}
    `
  );
  return await myDataSource.query(
    `
        SELECT r.id,
               r.is_private,
               r.user_id,
               ug.company_name,
               u.nickname,
               u.email,
               u.position_name,
               r.feed_id,
               r.comment,
               r.parent_reply_id,
               SUBSTRING(r.created_at, 1, 16) AS created_at
        FROM replies r
                 JOIN users u ON
            r.user_id = u.id
                LEFT JOIN user_group ug ON 
            ug.id = u.group_id
        WHERE r.id = ${replyId}
    `,
    [replyId]
  );
};

const deleteReply = async (replyId: number) => {
  return await myDataSource.query(
    `
        UPDATE
            replies
        SET comment = FALSE,
            is_deleted = TRUE
        WHERE
            id = ?
    `,
    [replyId]
  );
};
export default {
  getCountOfAllComments,
  getListOfRepliesByFeed,
  createReply,
  findReply,
  updateReply,
  deleteReply,
  findReplyIndex,
};
