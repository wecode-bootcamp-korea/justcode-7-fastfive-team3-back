import myDataSource from './index';

const getParentCategoryList = async () => {
  return await myDataSource.query(
    `
        SELECT id AS category_id,
               category,
               introduction,
               IFNULL(parent_category_id, "상위 카테고리") AS parent_category_id
        FROM category c
        WHERE parent_category_id IS NULL   
    `
  );
};

const getLocationList = async () => {
  return await myDataSource.query(
    `
        SELECT id,
               location
        FROM location l
    `
  );
};

const findChildCategoryList = async (categoryId: number) => {
  return await myDataSource.query(
    `
        SELECT id,
               category,
               introduction,
               parent_category_id
        FROM category c
        WHERE parent_category_id = ?
    `,
    [categoryId]
  );
};

export default {
  getParentCategoryList,
  findChildCategoryList,
  getLocationList,
};
