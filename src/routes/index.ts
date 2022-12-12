import { Router } from 'express';
const router = Router();

import { errorHandler } from '../middlewares/middlewares';

// 예시
// import userRouter from './user.router'

// router.use('/user', userRouter);

router.use(errorHandler);

export default router;
