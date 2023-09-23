import {Router} from 'express';
import {borrowerController} from '../../controllers';
import { Auth,apiLimiter } from '../../middlewares';
import asyncHandler from 'express-async-handler';


const router = Router();

router.delete('/',asyncHandler(apiLimiter),asyncHandler(Auth),asyncHandler(borrowerController.delete))
router.patch('/',asyncHandler(apiLimiter), asyncHandler(Auth),asyncHandler(borrowerController.update))
router.post('/check/:bookId',asyncHandler(apiLimiter), asyncHandler(Auth),asyncHandler(borrowerController.checkBook))
export default router;

