import feedDao from '../models/feedDao';

const createFeed = async (
  userId: number,
  category: string,
  title: string,
  logo: string,
  logoSize: number,
  introduction: string,
  main_field: string,
  contact: string,
  branch: string,
  hompage?: string,
  detail_introduction?: string,
  member_benefit?: string,
  file?: string,
  fileName?: string,
  fileSize?: number
) => {
  const userAuth: { userSortId: number; userAdminId: number } =
    await feedDao.findUserAuth(userId);

  if (
    !(
      userAuth.userSortId === 1 ||
      userAuth.userSortId === 3 ||
      userAuth.userAdminId === 1
    )
  ) {
    const error = new Error(' Your Not Authorization! ');
    error.status = 403;
    throw error;
  }

  const existFeed = await feedDao.isExistFeed(userId);

  if (existFeed.length === 1) {
    const error = new Error(' Exist User Feed! ');
    error.status = 400;
    throw error;
  }

  if (logoSize > 10000000) {
    const error = new Error(' Logo Size too Big! ');
    error.status = 400;
    throw error;
  }

  if (fileSize > 30000000) {
    const error = new Error(' File Size too Big! ');
    error.status = 400;
    throw error;
  }

  const categoryArray = category.split(',');
  const categoryNameArray: string[] = [];
  if (categoryArray.length === 1) {
    categoryNameArray.push(categoryArray[0]);
  } else {
    categoryNameArray.push(categoryArray[1]);
  }
  const categoryName = categoryNameArray[0];
  const mainFieldArray = main_field.split(',');
  const branchId: number = await feedDao.findBranchId(branch);
  const categoryId: number = await feedDao.findCategoryId(categoryName);

  await feedDao.createFeed(
    userId,
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

const updateFeed = async (
  userId: number,
  category: string,
  title: string,
  logo: string,
  logoSize: number,
  introduction: string,
  main_field: string,
  contact: string,
  branch: string,
  hompage?: string,
  detail_introduction?: string,
  member_benefit?: string,
  file?: string,
  fileName?: string,
  fileSize?: number
) => {
  const userAuth: { userSortId: number; userAdminId: number } =
    await feedDao.findUserAuth(userId);

  if (
    !(
      userAuth.userSortId === 1 ||
      userAuth.userSortId === 3 ||
      userAuth.userAdminId === 1
    )
  ) {
    const error = new Error(' Your Not Authorization! ');
    error.status = 403;
    throw error;
  }

  if (logoSize > 10000000) {
    const error = new Error(' Logo Size too Big! ');
    error.status = 400;
    throw error;
  }

  if (fileSize > 30000000) {
    const error = new Error(' File Size too Big! ');
    error.status = 400;
    throw error;
  }

  const categoryArray = category.split(',');
  const categoryNameArray: string[] = [];
  if (categoryArray.length === 1) {
    categoryNameArray.push(categoryArray[0]);
  } else {
    categoryNameArray.push(categoryArray[1]);
  }
  const categoryName = categoryNameArray[0];
  const mainFieldArray = main_field.split(',');
  const branchId: number = await feedDao.findBranchId(branch);
  const categoryId: number = await feedDao.findCategoryId(categoryName);
  await feedDao.updateFeed(
    userId,
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
  await feedDao.updateMainFieldId(feedId, mainFieldId);
  await feedDao.updateFile(feedId, fileName, file);
};

export default { createFeed, updateFeed };
