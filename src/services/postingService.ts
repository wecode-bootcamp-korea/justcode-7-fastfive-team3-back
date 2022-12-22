import postingDao from '../models/postingDao';
import userDao from '../models/userDao';
import feedListDao from '../models/feedListDao';

const createTemporarySaveFeed = async (
  userId: number,
  categoryId: number | null,
  title: string | null,
  logo: string | null,
  logoSize: number | null,
  introduction: string | null,
  main_field: string | null,
  contact: string | null,
  branch: string | null,
  hompage?: string | null,
  detail_introduction?: string | null,
  member_benefit?: string | null,
  file?: string | null,
  fileName?: string | null,
  fileSize?: number | null
) => {
  const findGroupId = await userDao.checkUserPermission(userId);
  const userPermission = findGroupId.write_permission;

  if (!userPermission) {
    const error = new Error(' Your Not Authorization! ');
    error.status = 403;
    throw error;
  }

  const existTemporarySaveFeed = await postingDao.isExistTemporarySaveFeed(
    userId
  );

  if (existTemporarySaveFeed.length === 1) {
    const error = new Error(' Exist User Temporary Save Feed ');
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

  let mainFieldArray: string[] | null[] = [];
  if (typeof main_field === 'string') {
    mainFieldArray = main_field.replace(/ /g, '').split(',');
  } else {
    mainFieldArray = [null];
  }

  let branchIdObject: { id: number } = await postingDao.findBranchId(branch);
  let branchId = 0;
  if (branchIdObject === undefined) {
    branchId = null;
  } else {
    branchId = branchIdObject.id;
  }

  await postingDao.createTemporarySaveFeed(
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

const getFeed = async (userId: number) => {
  const feedId: number = await postingDao.findFeedId(userId);
  const result: any = await postingDao.getFeed(feedId);
  return result;
};

const updateTemporarySaveFeed = async (
  userId: number,
  categoryId: number | null,
  title: string | null,
  logo: string | null,
  logoSize: number | null,
  introduction: string | null,
  main_field: string | null,
  contact: string | null,
  branch: string | null,
  hompage?: string | null,
  detail_introduction?: string | null,
  member_benefit?: string | null,
  file?: string | null,
  fileName?: string | null,
  fileSize?: number | null
) => {
  const findGroupId = await userDao.checkUserPermission(userId);
  const userPermission = findGroupId.write_permission;

  if (!userPermission) {
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

  let mainFieldArray: string[] | null[] = [];
  if (typeof main_field === 'string') {
    mainFieldArray = main_field.replace(/ /g, '').split(',');
  } else {
    mainFieldArray = [null];
  }

  let branchIdObject: { id: number } = await postingDao.findBranchId(branch);
  let branchId = 0;
  if (branchIdObject === undefined) {
    branchId = null;
  } else {
    branchId = branchIdObject.id;
  }

  await postingDao.updateTemporarySaveFeed(
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
  const feedsMainFieldId: { id: number }[] =
    await postingDao.findfeedsMainFieldId(feedId);
  const feedsMainFieldArray: number[] = [];
  for (let i = 0; i < feedsMainFieldId.length; i++) {
    feedsMainFieldArray.push(feedsMainFieldId[i].id);
  }
  await postingDao.setNull(feedId, feedsMainFieldArray);
  await postingDao.updateMainFieldId(feedId, mainFieldId, feedsMainFieldArray);
  await postingDao.updateFile(feedId, fileName, file);
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
  const findGroupId = await userDao.checkUserPermission(userId);
  const userPermission = findGroupId.write_permission;

  if (!userPermission) {
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
  let branchIdObject: { id: number } = await postingDao.findBranchId(branch);
  let branchId = 0;
  if (branchIdObject === undefined) {
    branchId = null;
  } else {
    branchId = branchIdObject.id;
  }

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

const deleteFeed = async (userId: number, feedId: number) => {
  const [checkFeed] = await feedListDao.getFeedDetail(feedId);
  console.log('checkFeed = ', checkFeed);
  if (!checkFeed) {
    throw { status: 400, message: 'FEED_IS_NOT_EXIST' };
    return;
  }

  const userPermission = await userDao.checkUserPermission(userId);
  if (!userPermission.is_admin) {
    throw { status: 400, message: 'ADMIN_ONLY' };
    return;
  }
  if (userPermission.group_id !== checkFeed.group_id) {
    throw { status: 400, message: 'GROUP_ADMIN_ONLY' };
    return;
  }
  return await postingDao.deleteFeed(feedId);
};
export default {
  createTemporarySaveFeed,
  getFeed,
  updateTemporarySaveFeed,
  updateFeed,
  deleteFeed,
};
