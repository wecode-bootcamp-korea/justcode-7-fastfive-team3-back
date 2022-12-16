import feedListService from '../services/feedListService';
import { Request, Response } from 'express';

const getFeedList = async (req: Request, res: Response) => {
  const { location_id, category_id, sub_category_id } = req.query;
  const result = await feedListService.getFeedList(
    location_id,
    category_id,
    sub_category_id
  );
  res.status(200).json(result);
};

export default { getFeedList };
