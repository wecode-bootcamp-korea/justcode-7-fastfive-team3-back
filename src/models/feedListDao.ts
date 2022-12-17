import myDataSource from './index';

const getFeedList = async (selectFilters: string | null) => {
  return await myDataSource.query(
    `
        WITH tables AS (SELECT f.id     AS feed_id,
                               count(*) AS comment_cnt
                        FROM replies r
                                 JOIN feeds f ON
                            f.id = r.feed_id
                        GROUP BY f.id)
        SELECT f.id AS feed_id,
               u.company_name,
               f.introduction,
               f.logo_img,
               t1.comment_cnt,
               l.id AS location_id,
               l.location,
               ca.category
        FROM feeds f
                 LEFT JOIN users u ON
            f.user_id = u.id
                 LEFT JOIN branch b ON
            b.id = f.use_branch_id
                 LEFT JOIN branch_location bl ON
            bl.branch_id = b.id
                 LEFT JOIN location l ON
            l.id = bl.location_id
                 LEFT JOIN category ca ON
            f.category_id = ca.id
                 LEFT JOIN tables t1 ON
            t1.feed_id = f.id
            ${selectFilters}
    `
  );
};

export default { getFeedList };
