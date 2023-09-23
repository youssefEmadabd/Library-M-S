import express, { Router } from 'express';
import userRoutes from './user.route';
import adminRoutes from './admin.route';
import bookRoutes from './book.route';
import borrowerRoutes from './borrower.route'


const router: Router = express.Router();
router.use('/user', userRoutes)
router.use('/admin', adminRoutes)
router.use('/borrower', borrowerRoutes)
router.use('/book', bookRoutes)

export default router;