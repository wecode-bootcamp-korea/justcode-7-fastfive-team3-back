import { Router } from 'express';
const router = Router();

import {
  authMiddleware,
  catchMiddleware,
  checkPermission,
} from '../middlewares/middleware';
import subhomeController from '../controllers/subhomeController';

router.get(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(checkPermission),
  catchMiddleware(subhomeController.getSubhomeList)
);
router.get(
  '/category',
  catchMiddleware(authMiddleware),
  catchMiddleware(checkPermission),
  catchMiddleware(subhomeController.getSubhome2List)
);
export default router;
