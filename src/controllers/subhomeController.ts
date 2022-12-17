import { Request, Response } from 'express';
import subhomeService from '../services/subhomeService';

const getSubhomeList = async (req: Request, res: Response) => {
  const result = await subhomeService.getSubhomeList();

  res.status(200).json(result);
};

const getSubhome2List = async (req: Request, res: Response) => {
  let category_id: string = String(req.query.category_id);
  if (category_id) {
    const result = await subhomeService.getSubhome2List(category_id);
    res.status(200).json(result);
  } else {
    const result = await subhomeService.getSubhome2List();
    res.status(200).json(result);
  }
};
export default { getSubhomeList, getSubhome2List };
