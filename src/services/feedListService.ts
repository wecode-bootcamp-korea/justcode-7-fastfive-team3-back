import feedListDao from '../models/feedListDao';

const limit = 4; // TODO 최종 배포 전 limit = 8 로 고치기!
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
  if (locationId && categoryId && subCategoryId) {
    selectFilters = `
      AND l.id = ${locationId}
      AND ca.id =  ${subCategoryId}
    `;
    await feedListDao.getFeedList(selectFilters, pagenation);
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

const getFeedDetail = async (feedId: number) => {
  return await feedListDao.getFeedDetail(feedId);
};

export default { getFeedList, getFeedDetail };
