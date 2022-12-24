import { Router } from 'express';
const router = Router();

import { authMiddleware, catchMiddleware } from '../middlewares/middleware';
import userController from '../controllers/userController';

router.post('/signup', catchMiddleware(userController.signUp));
router.post('/login', catchMiddleware(userController.login));
router.get(
  '/checkauth',
  catchMiddleware(authMiddleware),
  catchMiddleware(userController.checkUserPermission)
);
router.get(
  '/group',
  catchMiddleware(authMiddleware),
  catchMiddleware(userController.findGroupFeed)
);
export default router;
