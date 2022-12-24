import { Router } from 'express';
const router = Router();

import {
  authMiddleware,
  catchMiddleware,
  checkPermission,
} from '../middlewares/middleware';
import replyController from '../controllers/replyController';

router.post(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(checkPermission),
  catchMiddleware(replyController.createReply)
);
router.patch(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(checkPermission),
  catchMiddleware(replyController.updateReply)
);
router.delete(
  '',
  catchMiddleware(authMiddleware),
  catchMiddleware(checkPermission),
  catchMiddleware(replyController.deleteReply)
);
router.get(
  '/:feed_id',
  catchMiddleware(authMiddleware),
  catchMiddleware(checkPermission),
  catchMiddleware(replyController.getListOfRepliesByFeed)
);

export default router;
