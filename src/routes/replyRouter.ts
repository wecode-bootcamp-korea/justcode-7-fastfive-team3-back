import { Router } from 'express';
const router = Router();

import { catchMiddleware } from '../middlewares/middleware';
import replyController from '../controllers/replyController';

router.get(
  '/:feed_id',
  catchMiddleware(replyController.getListOfRepliesByFeed)
);

export default router;
