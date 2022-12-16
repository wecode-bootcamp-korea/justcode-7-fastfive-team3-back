import { Router } from 'express';
const router = Router();

import { catchMiddleware } from '../middlewares/middleware';
import feedListController from '../controllers/feedListController';

router.get('', catchMiddleware(feedListController.getFeedList));

export default router;
