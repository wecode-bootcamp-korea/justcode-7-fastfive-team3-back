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

export default { getSubhomeList };
