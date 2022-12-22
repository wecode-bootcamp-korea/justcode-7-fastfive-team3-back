import { Router } from 'express';
const router = Router();
import uplad from '../middlewares/multer';
import { catchMiddleware } from '../middlewares/middleware';
import { authMiddleware } from '../middlewares/middleware';

import postingController from '../controllers/postingController';

router.post(
  '/posting/temporarysave',
  authMiddleware,
  uplad.array('file', 4),
  catchMiddleware(postingController.createTemporarySaveFeed)
);

router.get(
  '/posting',
  authMiddleware,
  catchMiddleware(postingController.getFeed)
);

router.put(
  '/posting/temporarysave',
  authMiddleware,
  uplad.array('file', 4),
  catchMiddleware(postingController.updateTemporarySaveFeed)
);

router.put(
  '/posting',
  authMiddleware,
  uplad.array('file', 4),
  catchMiddleware(postingController.updateFeed)
);

router.delete(
  '/posting',
  catchMiddleware(authMiddleware),
  catchMiddleware(postingController.deleteFeed)
);

export default router;
