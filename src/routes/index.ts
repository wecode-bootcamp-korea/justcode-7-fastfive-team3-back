import { Router } from 'express';
const router = Router();

import { errHandler } from '../utils/util';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';

router.use('/user', userRouter);
router.use('/category', categoryRouter);

router.use(errHandler);

export default router;
