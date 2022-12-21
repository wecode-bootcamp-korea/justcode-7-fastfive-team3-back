import { Router } from 'express';
const router = Router();

import { catchMiddleware } from '../middlewares/middleware';
import subhomeController from '../controllers/subhomeController';

router.get('', catchMiddleware(subhomeController.getSubhomeList));
router.get('/category', catchMiddleware(subhomeController.getSubhome2List));
export default router;
