import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { IAdminOutput, IUserOutput, RequestInterface } from '../types';
import { config } from '../config/config';
import ApiError from '../utils/apiError';
import { AdminService, UserService } from '../services';
import { Admin, User } from '../models';

const adminService = new AdminService(Admin);
const userService = new UserService(User);

async function CheckIfAdmin(req: RequestInterface, res: Response, next: NextFunction) {
    const id = req.user.sub
    const currentUser: IUserOutput[] = await userService.get({ where: { id } })
    if (!currentUser[0]) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
    const admin: object = await adminService.get({ where: { userId: id } });
    if(!admin[0]) throw new ApiError(httpStatus.UNAUTHORIZED, "User is not an Admin, can not alter books");
    next();
}

export {CheckIfAdmin}