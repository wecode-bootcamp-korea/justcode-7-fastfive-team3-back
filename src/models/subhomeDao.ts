import myDataSource from './index';

const getSubhomeList = async () => {
  return await myDataSource.query(
    `
        SELECT id AS category_id,
               category,
               introduction,
               category_img_url,
               IFNULL(parent_category_id, "상위 카테고리") AS parent_category_id
        FROM category c
        WHERE parent_category_id IS NULL
    `
  );
};

const getSubhome2List = async (category_id: string) => {
  return await myDataSource.query(
    `
        SELECT f.id AS feed_id,
               u.company_name,
               f.logo_img,
               f.introduction,
               c.category,
               SUBSTRING(f.created_at, 1, 16) AS created_at
        FROM feeds AS f
                 LEFT JOIN category AS c ON
            f.category_id = c.id
                 LEFT JOIN users AS u ON
            f.user_id = u.id
        WHERE c.parent_category_id IS NULL
            ${category_id}
        ORDER BY feed_id DESC
    `
  );
};

export default { getSubhomeList, getSubhome2List };
