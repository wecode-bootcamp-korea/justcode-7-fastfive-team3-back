import { Router } from 'express';
const router = Router();

import { errHandler } from '../utils/util';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';
import subhomeRouter from './subhomeRouter';
import feedListRouter from './feedListRouter';
import postingRouter from './postingRouter';
import replyRouter from './replyRouter';

router.use(errHandler);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/subhome', subhomeRouter);
router.use('/feedlist', feedListRouter);
router.use('/feed', postingRouter);
router.use('/reply', replyRouter);

router.use(errHandler);
export default router;
