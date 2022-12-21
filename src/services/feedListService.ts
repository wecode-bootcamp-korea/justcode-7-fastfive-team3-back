import feedListDao from '../models/feedListDao';

const getFeedList = async (
  location_id?: number,
  category_id?: number,
  sub_category_id?: number,
  page?: number
) => {
  const limit = 4;

  if (!page) {
    page = 1;
  }
  const pageOffset: number = (page - 1) * limit;
  const pagenation = `
  LIMIT ${pageOffset}, ${limit}
  `;

  let selectFilters: string;
  if (location_id && category_id && sub_category_id) {
    selectFilters = `
      WHERE l.id = ${location_id}
      AND ca.id =  ${sub_category_id}
    `;
    return await feedListDao.getFeedList(selectFilters, pagenation);
  }

  if (location_id && category_id) {
    selectFilters = `
      WHERE l.id = ${location_id}
      AND (ca.id = ${category_id} OR ca.parent_category_id = ${category_id})
      `;
    return await feedListDao.getFeedList(selectFilters, pagenation);
  }

  if (location_id) {
    selectFilters = `
      WHERE l.id = ${location_id}
      `;
    return await feedListDao.getFeedList(selectFilters, pagenation);
  }
  selectFilters = '';
  return await feedListDao.getFeedList(selectFilters, pagenation);
};

export default { getFeedList };
