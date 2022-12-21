import { Request, Response } from 'express';
import subhomeService from '../services/subhomeService';

const getSubhomeList = async (req: Request, res: Response) => {
  const cursorId: number = Number(req.query.cursorId);
  const result = await subhomeService.getSubhomeList(cursorId);

  res.status(200).json(result);
};

const getSubhome2List = async (req: Request, res: Response) => {
  const categoryId: any = req.query.category_id;

  if (!categoryId) {
    const result = await subhomeService.getSubhome2List();
    res.status(200).json(result);
  } else if (categoryId) {
    const result = await subhomeService.getSubhome2List(categoryId);
    res.status(200).json(result);
  }
};
export default { getSubhomeList, getSubhome2List };
