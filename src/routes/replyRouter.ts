import { Router } from 'express';
const router = Router();

import { authMiddleware, catchMiddleware } from '../middlewares/middleware';
import replyController from '../controllers/replyController';

router.post(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(replyController.createReply)
);
router.get(
  '/:feed_id',
  catchMiddleware(replyController.getListOfRepliesByFeed)
);

export default router;
