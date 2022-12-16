import { Router } from 'express';
const router = Router();
import uplad from '../middlewares/multer';
import { catchMiddleware } from '../middlewares/middleware';
import { authMiddleware } from '../middlewares/middleware';

import feedController from '../controllers/feedController';

router.post(
  '/upload',
  authMiddleware,
  uplad.array('file', 4),
  catchMiddleware(feedController.createFeed)
);

export default router;
