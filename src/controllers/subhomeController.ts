import { Request, Response } from 'express';
import subhomeService from '../services/subhomeService';

const getSubhomeList = async (req: Request, res: Response) => {
  const result = await subhomeService.getSubhomeList();

  res.status(200).json(result);
};

const getSubhome2List = async (req: Request, res: Response) => {
  const { category_id } = req.query;
  if (category_id) {
    const categoryIdArr = category_id.split(' ');
    const result = await subhomeService.getSubhome2List(categoryIdArr);
    res.status(200).json(result);
  } else {
    const result = await subhomeService.getSubhome2List();
    res.status(200).json(result);
  }
};
export default { getSubhomeList, getSubhome2List };
