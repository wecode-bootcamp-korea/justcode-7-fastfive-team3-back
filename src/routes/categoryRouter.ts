import { Router } from 'express';
const router = Router();

import { catchMiddleware } from '../middlewares/middleware';
import categoryController from '../controllers/categoryController';

router.get('', catchMiddleware(categoryController.getParentCategoryList));
router.get(
  '/:category_id',
  catchMiddleware(categoryController.findChildCategoryList)
);

export default router;
