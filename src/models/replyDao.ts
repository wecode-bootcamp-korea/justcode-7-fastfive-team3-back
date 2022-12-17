import myDataSource from './index';

const getListOfRepliesByFeed = async (feed_id: number) => {
  return await myDataSource
    .query(
      `
        SELECT t2.*,
               u.company_name,
               u.nickname,
               u.email,
               u.position_name,
               u.group_id,
               u.is_admin
        FROM (SELECT *
              FROM (SELECT r.id,
                           r.status,
                           r.user_id,
                           r.feed_id,
                           r.comment,
                           r.parent_reply_id,
                           SUBSTRING(r.created_at, 1, 16) AS created_at,
                           RANK() OVER (PARTITION BY parent_reply_id
                               ORDER BY
                                   id ASC) AS rnk
                    FROM replies r
                    WHERE feed_id = 1
                      AND parent_reply_id) AS t1
              UNION ALL

              (SELECT r2.id,
                      r2.status,
                      r2.user_id,
                      r2.feed_id,
                      r2.comment,
                      r2.parent_reply_id,
                      SUBSTRING(r2.created_at, 1, 16) AS create_at,
                      r2.id AS rnk
               FROM replies r2
               WHERE r2.feed_id = 1
                 AND r2.parent_reply_id = 0
               ORDER BY r2.id ASC)) AS t2
                 INNER JOIN users u ON
            t2.user_id = u.id
    `
    )
    .then(value => {
      let ret = value
        .filter((e: any) => e.parent_reply_id === 0)
        .map((e: any) => {
          e.reply = [];
          return e;
        });
      value
        .filter((e: any) => e.parent_reply_id !== 0)
        .forEach((e: any) =>
          ret.find((re: any) => re.id === e.parent_reply_id).reply.unshift(e)
        );
      return ret;
    });
};

const createReply = async (
  user_id: number,
  feed_id: number,
  comment: string,
  parent_reply_id?: number
) => {
  await myDataSource.query(
    `
    INSERT
      replies SET
      user_id = ${user_id},
      feed_id = ${feed_id},
      comment = '${comment}',
      parent_reply_id = ${parent_reply_id}
    `
  );
  return await myDataSource.query(
    `
        SELECT r.id,
               r.user_id,
               u.company_name,
               u.nickname,
               u.email,
               u.position_name,
               r.feed_id,
               r.comment,
               r.parent_reply_id,
               r.status,
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
const updateReply = async (reply_id: number, comment: string) => {
  await myDataSource.query(
    `
    UPDATE
      replies SET
      comment = '${comment}'
    WHERE
      id = ${reply_id}
    `
  );
  return await myDataSource.query(
    `
        SELECT r.id,
               r.user_id,
               u.company_name,
               u.nickname,
               u.email,
               u.position_name,
               r.feed_id,
               r.comment,
               r.parent_reply_id,
               r.status,
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
  getListOfRepliesByFeed,
  createReply,
  findReply,
  updateReply,
  deleteReply,
};
