import categoryDao from '../models/categoryDao';

const getParentCategoryList = async () => {
  return await categoryDao.getParentCategoryList();
};

const findChildCategoryList = async (category_id: number) => {
  return await categoryDao.findChildCategoryList(category_id);
};

export default { getParentCategoryList, findChildCategoryList };
