import feedListService from '../services/feedListService';
import { Request, Response } from 'express';

const getFeedList = async (req: Request, res: Response) => {
  let locationId: number = Number(req.query.locattion_id);
  let categoryId: number = Number(req.query.category_id);
  let subCategoryId: number = Number(req.query.sub_category_id);
  let page: number = Number(req.query.page);

  const result = await feedListService.getFeedList(
    locationId,
    categoryId,
    subCategoryId,
    page
  );
  res.status(200).json(result);
};

const getFeedDetail = async (req: Request, res: Response) => {
  let feedId: number = Number(req.params.feed_id);
  const result = await feedListService.getFeedDetail(feedId);

  res.status(200).json(result);
};
export default { getFeedList, getFeedDetail };
