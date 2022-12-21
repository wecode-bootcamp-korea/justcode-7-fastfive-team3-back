import feedListService from '../services/feedListService';
import { Request, Response } from 'express';

const getFeedList = async (req: Request, res: Response) => {
  let location_id: number = Number(req.query.location_id);
  let category_id: number = Number(req.query.category_id);
  let sub_category_id: number = Number(req.query.sub_category_id);
  let page: number = Number(req.query.page);

  const result = await feedListService.getFeedList(
    location_id,
    category_id,
    sub_category_id,
    page
  );
  res.status(200).json(result);
};

export default { getFeedList };
