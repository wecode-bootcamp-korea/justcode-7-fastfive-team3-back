import { Router } from 'express';
const router = Router();

import {
  authMiddleware,
  catchMiddleware,
  checkPermission,
} from '../middlewares/middleware';
import feedListController from '../controllers/feedListController';

router.get(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(checkPermission),
  catchMiddleware(feedListController.getFeedList)
);
router.get(
  '/:feed_id',
  catchMiddleware(authMiddleware),
  catchMiddleware(checkPermission),
  catchMiddleware(feedListController.getFeedDetail)
);

export default router;
