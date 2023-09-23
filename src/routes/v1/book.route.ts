import {Router} from 'express';
import {bookController} from '../../controllers';
import asyncHandler from 'express-async-handler';

import {Auth, CheckIfAdmin, apiLimiter} from '../../middlewares/';

const router = Router();

router.post('/',asyncHandler(apiLimiter),asyncHandler(Auth),asyncHandler(CheckIfAdmin),asyncHandler(bookController.create));
router.patch('/:id',asyncHandler(apiLimiter),asyncHandler(Auth),asyncHandler(CheckIfAdmin),asyncHandler(bookController.update));
router.get('/',asyncHandler(apiLimiter),asyncHandler(Auth),asyncHandler(bookController.getAll))
router.delete('/:id',asyncHandler(apiLimiter),asyncHandler(Auth),asyncHandler(CheckIfAdmin),asyncHandler(bookController.delete));
router.get('/search',asyncHandler(apiLimiter),asyncHandler(Auth),asyncHandler(bookController.search));
export default router;
