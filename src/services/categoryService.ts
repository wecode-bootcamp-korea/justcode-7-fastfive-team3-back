import categoryDao from '../models/categoryDao';

const getParentCategoryList = async () => {
  return await categoryDao.getParentCategoryList();
};

const findChildCategoryList = async (categoryId: number) => {
  return await categoryDao.findChildCategoryList(categoryId);
};

export default { getParentCategoryList, findChildCategoryList };
