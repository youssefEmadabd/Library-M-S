import {Router} from 'express';
import {userController} from '../../controllers';
import asyncHandler from 'express-async-handler';

import {Auth,apiLimiter} from '../../middlewares/';

const router = Router();

router.post('/login',asyncHandler(apiLimiter), asyncHandler(userController.login));
router.post('/register/:role',asyncHandler(apiLimiter), asyncHandler(userController.register));


export default router;
