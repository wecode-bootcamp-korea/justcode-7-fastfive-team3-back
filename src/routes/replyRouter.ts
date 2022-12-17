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
router.delete(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(replyController.deleteReply)
);
router.get(
  '/:feed_id',
  catchMiddleware(authMiddleware),
  catchMiddleware(replyController.getListOfRepliesByFeed)
);

export default router;
