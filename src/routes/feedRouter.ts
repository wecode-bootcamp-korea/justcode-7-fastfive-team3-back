import { Router } from 'express';
const router = Router();
import uplad from '../middlewares/multer'

import * as feedController from '../controllers/feedController'

router.post('/upload', uplad.array('file', 4), feedController.createFeed)

export default router;