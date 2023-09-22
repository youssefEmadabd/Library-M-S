import {Router} from 'express';
import {userController} from '../../controllers';
import asyncHandler from 'express-async-handler';

import {Auth} from '../../middlewares/';

const router = Router();

export default router;
