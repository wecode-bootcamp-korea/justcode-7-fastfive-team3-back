import myDataSource from './index';

const getParentCategoryList = async () => {
  return await myDataSource.query(
    `
        SELECT id,
               category,
               introduction,
               IFNULL(parent_category_id, "상위 카테고리") AS parent_category_id
        FROM category c
        WHERE parent_category_id IS NULL   
    `
  );
};

const findChildCategoryList = async (category_id: number) => {
  return await myDataSource.query(
    `
        SELECT id,
               category,
               introduction,
               parent_category_id
        FROM category c
        WHERE parent_category_id = ?
    `,
    [category_id]
  );
};

export default { getParentCategoryList, findChildCategoryList };
