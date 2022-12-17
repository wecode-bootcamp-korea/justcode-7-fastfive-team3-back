import { Router } from 'express';
const router = Router();

import { authMiddleware, catchMiddleware } from '../middlewares/middleware';
import replyController from '../controllers/replyController';

router.post(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(replyController.createReply)
);
router.patch(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(replyController.updateReply)
);
router.get(
  '/:feed_id',
  catchMiddleware(replyController.getListOfRepliesByFeed)
);

export default router;
