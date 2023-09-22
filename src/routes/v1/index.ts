import express, { Router } from 'express';
import userRoutes from './user.route';


const router: Router = express.Router();
router.use('/user', userRoutes)
router.use('/admin', userRoutes)
router.use('/borrower', userRoutes)
router.use('/book', userRoutes)

export default router;