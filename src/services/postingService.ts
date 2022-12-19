import postingDao from '../models/postingDao';

const createFeed = async (
  userId: number,
  categoryId: number,
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

  const mainFieldArray = main_field.replace(/ /g, '').split(',');
  const branchId: number = await postingDao.findBranchId(branch);

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
  const mainFieldId: (number | null)[] = await postingDao.findMainFieldId(
    mainFieldArray
  );
  await postingDao.insertMainFieldId(feedId, mainFieldId);
  await postingDao.insertFile(feedId, fileName, file);
};

const updateFeed = async (
  userId: number,
  categoryId: number,
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

  const mainFieldArray = main_field.replace(/ /g, '').split(',');
  const branchId: number = await postingDao.findBranchId(branch);

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
  const feedsMainFieldId = await postingDao.findfeedsMainFieldId(feedId);
  const feedsMainFieldArray: number[] = [];
  for (let i = 0; i < feedsMainFieldId.length; i++) {
    feedsMainFieldArray.push(feedsMainFieldId[i].id);
  }
  await postingDao.setNull(feedId, feedsMainFieldArray);
  await postingDao.updateMainFieldId(feedId, mainFieldId, feedsMainFieldArray);
  await postingDao.updateFile(feedId, fileName, file);
};

const getFeed = async (userId: number) => {
  const feedId: number = await postingDao.findFeedId(userId);
  const result: any = await postingDao.getFeed(feedId);
  return result;
};

export default { createFeed, updateFeed, getFeed };
