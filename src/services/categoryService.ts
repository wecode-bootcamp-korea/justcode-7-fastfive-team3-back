import categoryDao from '../models/categoryDao';

const getParentCategoryList = async () => {
  return await categoryDao.getParentCategoryList();
};

const getLocationList = async () => {
  return await categoryDao.getLocationList();
};

const findChildCategoryList = async (categoryId: number) => {
  return await categoryDao.findChildCategoryList(categoryId);
};

export default {
  getParentCategoryList,
  findChildCategoryList,
  getLocationList,
};
