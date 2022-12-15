import feedDao from '../models/feedDao';

const createFeed = async (
  //userId
  category: string,
  title: string,
  logo: string,
  introduction: string,
  main_field: string,
  contact: string,
  branch: string,
  detail_category?: string,
  hompage?: string,
  detail_introduction?: string,
  member_benefit?: string,
  file?: string,
  fileName?: string
) => {
  const mainFieldArray = main_field.split(',');
  const branchId: number = await feedDao.findBranchId(branch);
  // TODO 디테일 카테고리가 없는 경우는 어떻게 할지..
  let categoryId = await feedDao.findDetailCategoryId(detail_category);

  await feedDao.createFeed(
    //userId
    categoryId,
    title,
    logo,
    introduction,
    hompage,
    detail_introduction,
    member_benefit,
    contact,
    branchId
  );
  const feedId: number = await feedDao.findFeedId(title);
  await feedDao.insertMainField(mainFieldArray);
  await feedDao.foreignKeySetZero();
  await feedDao.deleteOverlapMainField();
  await feedDao.foreignKeySetOne();
  const mainFieldId: number[] = await feedDao.findMainFieldId(mainFieldArray);
  await feedDao.insertMainFieldId(feedId, mainFieldId);
  await feedDao.insertFile(feedId, fileName, file);
};

export default { createFeed };
