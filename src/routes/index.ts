import { Router } from 'express';
const router = Router();

import { errHandler } from '../utils/util';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';
import subhomeRouter from './subhomeRouter';
import feedListRouter from './feedListRouter';
import feedRouter from './feedRouter';

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/subhome', subhomeRouter);
router.use('/feedlist', feedListRouter);
router.use(errHandler);
router.use('/feed', feedRouter);

export default router;
