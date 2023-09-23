import {Router} from 'express';
import {adminController} from '../../controllers';
import asyncHandler from 'express-async-handler'
import { CheckIfAdmin,Auth ,apiLimiter} from '../../middlewares';


const router = Router();

router.get('/borrowers',asyncHandler(apiLimiter),asyncHandler(Auth),asyncHandler(CheckIfAdmin),asyncHandler(adminController.getAllBorrowers))

export default router;
