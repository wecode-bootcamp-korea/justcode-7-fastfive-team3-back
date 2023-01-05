import myDataSource from './index';

const getSubhomeList = async (lastCursorId: number) => {
  return await myDataSource.query(
    `
        SELECT id AS category_id,
               category,
               introduction,
               category_img_url,
               IFNULL(parent_category_id, "상위 카테고리") AS parent_category_id
        FROM category c
        WHERE parent_category_id IS NULL AND id > ?
        LIMIT 8
    `,
    [lastCursorId]
  );
};

const getSubhome2List = async (categoryId: string) => {
  return await myDataSource.query(
    `
        WITH table1 AS (SELECT feed_id,
                               count(*) AS comment_cnt
                        FROM replies r
                        GROUP BY feed_id)
        SELECT f.id                           AS feed_id,
               ug.company_name,
               f.logo_img,
               f.introduction,
               c.category,
               c.id                           AS category_id,
               IFNULL(t.comment_cnt, 0) AS comment_cnt,
               SUBSTRING(f.created_at, 1, 16) AS created_at,
               SUBSTRING(f.updated_at, 1, 16) AS updated_at
        FROM feeds AS f
                 LEFT JOIN category AS c ON
            f.category_id = c.id
                 LEFT JOIN category c2 ON
            c.parent_category_id = c2.id
                 LEFT JOIN users AS u ON
            f.user_id = u.id
                 LEFT JOIN user_group AS ug ON
            ug.id = u.group_id
                 LEFT JOIN table1 t ON
            t.feed_id = f.id
        WHERE ug.end_date >= date(now())
          AND f.status_id = 1 
           ${categoryId}
        ORDER BY updated_at DESC
    `
  );
};

export default { getSubhomeList, getSubhome2List };
