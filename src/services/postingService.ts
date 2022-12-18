import postingDao from '../models/postingDao';

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
    await postingDao.findUserAuth(userId);

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

  const existFeed = await postingDao.isExistFeed(userId);

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
  const branchId: number = await postingDao.findBranchId(branch);
  const categoryId: number = await postingDao.findCategoryId(categoryName);

  await postingDao.createFeed(
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
  const feedId: number = await postingDao.findFeedId(userId);
  await postingDao.insertMainField(mainFieldArray);
  await postingDao.foreignKeySetZero();
  await postingDao.deleteOverlapMainField();
  await postingDao.foreignKeySetOne();
  const mainFieldId: number[] = await postingDao.findMainFieldId(
    mainFieldArray
  );
  await postingDao.insertMainFieldId(feedId, mainFieldId);
  await postingDao.insertFile(feedId, fileName, file);
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
    await postingDao.findUserAuth(userId);

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
  const branchId: number = await postingDao.findBranchId(branch);
  const categoryId: number = await postingDao.findCategoryId(categoryName);
  await postingDao.updateFeed(
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
  const feedId: number = await postingDao.findFeedId(userId);
  await postingDao.insertMainField(mainFieldArray);
  await postingDao.foreignKeySetZero();
  await postingDao.deleteOverlapMainField();
  await postingDao.foreignKeySetOne();
  const mainFieldId: number[] = await postingDao.findMainFieldId(
    mainFieldArray
  );
  await postingDao.updateMainFieldId(feedId, mainFieldId);
  await postingDao.updateFile(feedId, fileName, file);
};

const getFeed = async (userId: number) => {
  const feedId: number = await postingDao.findFeedId(userId);
  const result: any = await postingDao.getFeed(feedId);
  return result;
};

export default { createFeed, updateFeed, getFeed };
