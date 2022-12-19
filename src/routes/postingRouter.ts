import { Router } from 'express';
const router = Router();
import uplad from '../middlewares/multer';
import { catchMiddleware } from '../middlewares/middleware';
import { authMiddleware } from '../middlewares/middleware';

import postingController from '../controllers/postingController';

router.post(
  '/posting',
  authMiddleware,
  uplad.array('file', 4),
  catchMiddleware(postingController.createFeed)
);

router.put(
  '/posting',
  authMiddleware,
  uplad.array('file', 4),
  catchMiddleware(postingController.updateFeed)
);

router.get(
  '/posting',
  authMiddleware,
  catchMiddleware(postingController.getFeed)
);

export default router;
