import myDataSource from './index';

const getCountOfAllComments = async (feed_id: number) => {
  return await myDataSource.query(
    `
        SELECT COUNT(*) AS reply_cnt
        FROM replies r
        WHERE feed_id = ?
    `,
    [feed_id]
  );
};

const getListOfRepliesByFeed = async (
  user_id: number,
  feed_id: number,
  pagenation?: string
) => {
  return await myDataSource
    .query(
      `
          SELECT t2.id,
                 t2.is_private,
                 t2.user_id,
                 t2.comment,
                 t2.parent_reply_id,
                 t2.reply_group,
                 t2.rnk,
                 u.company_name,
                 u.nickname,
                 u.email,
                 u.position_name,
                 u.group_id,
                 u.is_admin,
                 SUBSTRING(t2.created_at, 1, 16) AS created_at
          FROM (SELECT *
                FROM (SELECT r.id,
                             r.is_private,
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
                      WHERE feed_id = 1
                        AND parent_reply_id) AS t1
                UNION ALL
                (SELECT r2.id,
                        r2.is_private,
                        r2.user_id,
                        r2.feed_id,
                        r2.comment,
                        r2.parent_reply_id,
                        r2.created_at,
                        r2.parent_reply_id AS rnk,
                        r2.id              AS reply_group
                 FROM replies r2
                 WHERE r2.feed_id = 1
                   AND r2.parent_reply_id = 0
                 ORDER BY r2.id ASC)) AS t2
                   INNER JOIN users u ON
              t2.user_id = u.id
          ORDER BY reply_group,
                   rnk
                ${pagenation}
    `,
      [pagenation]
    )
    .then(value => {
      let ret = value
        .filter((e: any) => e.parent_reply_id === 0)
        .map((e: any) => {
          e.reply = [];
          return e;
        });

      // TODO 페이지네이션 후 첫 객체가 대댓글일때 상위댓글 객체 생성 처리
      // value
      //   .filter((e: any) => e.parent_reply_id !== 0)
      //   .map((e: any) => {
      //     const result = ret.find((re: any) => re.id === e.parent_reply_id);
      //     console.log('result =', result);
      //     if (!result) {
      //       let createObject = { id: e.parent_reply_id };
      //       e = Object.create(createObject);
      //     }
      //     e.rerply = [];
      //     e.reply.push(e);
      //   });

      value
        .filter((e: any) => e.parent_reply_id !== 0)
        .forEach((e: any) =>
          ret.find((re: any) => re.id === e.parent_reply_id).reply.push(e)
        );

      value
        .filter((e: any) => e.is_private === 1 && e.user_id !== user_id)
        .map((e: any) => {
          e.comment = false;
          return e;
        });
      return ret;
    });
};

const createReply = async (
  user_id: number,
  feed_id: number,
  comment: string,
  parent_reply_id: number,
  is_private: boolean
) => {
  await myDataSource.query(
    `
    INSERT
      replies SET
      user_id = ${user_id},
      feed_id = ${feed_id},
      comment = '${comment}',
      parent_reply_id = ${parent_reply_id},
      is_private = ${is_private}
    `
  );
  return await myDataSource.query(
    `
        SELECT r.id,
               r.is_private,
               r.user_id,
               u.company_name,
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
        WHERE r.user_id = ? AND r.feed_id = ?
        ORDER BY created_at DESC
        LIMIT 1
    `,
    [user_id, feed_id]
  );
};

const findReply = async (reply_id: number) => {
  return await myDataSource.query(
    `
        SELECT *
        FROM replies r
        WHERE id = ?
    `,
    [reply_id]
  );
};
const updateReply = async (
  reply_id: number,
  comment: string,
  is_private?: string
) => {
  await myDataSource.query(
    `
    UPDATE
      replies SET
      comment = '${comment}'
      ${is_private}
    WHERE
      id = ${reply_id}
    `
  );
  return await myDataSource.query(
    `
        SELECT r.id,
               r.is_private,
               r.user_id,
               u.company_name,
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
        WHERE r.id = ${reply_id}
    `,
    [reply_id]
  );
};

const deleteReply = async (reply_id: number) => {
  return await myDataSource.query(
    `
        DELETE
        FROM replies
        WHERE id = ?
    `,
    [reply_id]
  );
};
export default {
  getCountOfAllComments,
  getListOfRepliesByFeed,
  createReply,
  findReply,
  updateReply,
  deleteReply,
};
