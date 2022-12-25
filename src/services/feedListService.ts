import feedListDao from '../models/feedListDao';
import userDao from '../models/userDao';

const limit = 8;
const getFeedList = async (
  locationId?: number,
  categoryId?: number,
  subCategoryId?: number,
  page?: number
) => {
  if (!page) {
    page = 1;
  }
  const pageOffset: number = (page - 1) * limit;
  const pagenation = `
  LIMIT ${pageOffset}, ${limit}
  `;

  let selectFilters: string;
  if (locationId && subCategoryId) {
    selectFilters = `
      AND l.id = ${locationId}
      AND ca.id =  ${subCategoryId}
    `;
    return await feedListDao.getFeedList(selectFilters, pagenation);
  }

  if (locationId && categoryId) {
    selectFilters = `
      AND l.id = ${locationId}
      AND (ca.id = ${categoryId} OR ca.parent_category_id = ${categoryId})
      `;
    return await feedListDao.getFeedList(selectFilters, pagenation);
  }

  if (locationId) {
    selectFilters = `
      AND l.id = ${locationId}
      `;
    return await feedListDao.getFeedList(selectFilters, pagenation);
  }
  selectFilters = '';
  const result = await feedListDao.getFeedList(selectFilters, pagenation);
  const resultPageCnt = Math.ceil(result.resultPageCnt / limit);
  const resResult = result.result;

  return { resultPageCnt, resResult };
};

const getFeedDetail = async (userId: number, feedId: number) => {
  const userAuth = await userDao.checkUserPermission(userId);
  let [result] = await feedListDao.getFeedDetail(feedId);

  if (userAuth.member_type === '입주예정자') {
    result.contact = false;
  }
  return result;
};

export default { getFeedList, getFeedDetail };
