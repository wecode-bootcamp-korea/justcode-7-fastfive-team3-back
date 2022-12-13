import { Router } from 'express';
const router = Router();

import userRouter from './userRouter';
import { errHandler } from '../utils/util';

router.use('/user', userRouter);

router.use(errHandler);

export default router;
