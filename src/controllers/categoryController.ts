import { Request, Response } from 'express';
import categoryService from '../services/categoryService';

const getParentCategoryList = async (req: Request, res: Response) => {
  const result = await categoryService.getParentCategoryList();
  res.status(200).json(result);
};

const getLocationList = async (req: Request, res: Response) => {
  const result = await categoryService.getLocationList();
  res.status(200).json(result);
};
const findChildCategoryList = async (req: Request, res: Response) => {
  const categoryId: number = Number(req.params.category_id);
  const result = await categoryService.findChildCategoryList(categoryId);
  res.status(200).json(result);
};

export default {
  getParentCategoryList,
  getLocationList,
  findChildCategoryList,
};
