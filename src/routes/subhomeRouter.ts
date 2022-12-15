import { Router } from 'express';
const router = Router();

import { catchMiddleware } from '../middlewares/middleware';

import subhomeController from '../controllers/subhomeController';

router.get('', catchMiddleware(subhomeController.getSubhomeList));

export default router;
