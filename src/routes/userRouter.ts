import { Router } from 'express';
const router = Router();

import { catchMiddleware } from '../middlewares/middleware';
import userController from '../controllers/userController';

router.post('/signup', catchMiddleware(userController.signUp));
router.post('/login', catchMiddleware(userController.login));

export default router;
