import categoryDao from '../models/categoryDao';

const getParentCategoryList = async () => {
  // 프론트에서 상위 카테고리만 사용시
  return await categoryDao.getParentCategoryList();

  // TODO 프론트에게 반영할 수 있는지 물어보기
  // 상위카테고리와 지역정보를 함께 사용시
  // return await categoryDao.getParentCategoryAndLocationList();
};

const findChildCategoryList = async (categoryId: number) => {
  return await categoryDao.findChildCategoryList(categoryId);
};

export default { getParentCategoryList, findChildCategoryList };
