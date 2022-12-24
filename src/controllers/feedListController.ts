import feedListService from '../services/feedListService';
import { Request, Response } from 'express';

const getFeedList = async (req: Request, res: Response) => {
  const locationId: number = Number(req.query.location_id);
  const categoryId: number = Number(req.query.category_id);
  const subCategoryId: number = Number(req.query.sub_category_id);
  const page: number = Number(req.query.page);

  const result = await feedListService.getFeedList(
    locationId,
    categoryId,
    subCategoryId,
    page
  );
  res.status(200).json(result);
};

const getFeedDetail = async (req: Request, res: Response) => {
  const feedId: number = Number(req.params.feed_id);
  const userId: number = req.userInfo.id;
  const result = await feedListService.getFeedDetail(userId, feedId);

  res.status(200).json(result);
};
export default { getFeedList, getFeedDetail };
