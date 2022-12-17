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
        .filter(e => e.parent_reply_id === 0)
        .map(e => {
          e.reply = [];
          return e;
        });
      value
        .filter(e => e.parent_reply_id !== 0)
        .forEach(e =>
          ret.find(re => re.id === e.parent_reply_id).reply.unshift(e)
        );
      return ret;
    });
};

export default { getListOfRepliesByFeed };
