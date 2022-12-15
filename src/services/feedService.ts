import * as feedDao from '../models/feedDao';

export const createFeed = async (
  //userId
  category: string,
  title: string,
  logo: string,
  introduction: string,
  main_field: string[],
  contact: string[] | string,
  branch: string,
  detail_category?: string,
  hompage?: string,
  detail_introduction?: string,
  member_benefit?: string | string[],
  file?: string
): Promise<void> => {
  const branchId: number = await feedDao.findBranchId(branch);
  await feedDao.createFeed(
    //userId
    title,
    logo,
    introduction,
    hompage,
    detail_introduction,
    member_benefit,
    contact,
    file,
    branchId
  );

  // TODO 상세 카테고리는 어떻게 집어 넣어야 할까
  const feedId: number = await feedDao.findFeedId(title);
  //TODO id가 한개 들어올 경우는?
  const categoryId: number[] = await feedDao.findCategoryId(category);
  await feedDao.insertFeedIdcategoryId(feedId, categoryId);

  await feedDao.insertMainField(main_field);
  await feedDao.deleteOverlapMainField();
  //TODO id가 한개 들어올 경우는?
  const mainFieldId: number[] = await feedDao.findMainFieldId(main_field);
  await feedDao.insertMainFieldId(feedId, mainFieldId);
};
