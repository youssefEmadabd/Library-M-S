import {Router} from 'express';
import {userController} from '../../controllers';
import asyncHandler from 'express-async-handler';

import {Auth} from '../../middlewares/';

const router = Router();

router.post('/login', asyncHandler(userController.login));
router.post('/register/:role', asyncHandler(userController.register));

export default router;
