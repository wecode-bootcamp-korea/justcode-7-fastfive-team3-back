import { Request, Response } from 'express';
import subhomeService from '../services/subhomeService';

const getSubhomeList = async (req: Request, res: Response) => {
  const result = await subhomeService.getSubhomeList();

  res.status(200).json(result);
};

export default { getSubhomeList };
