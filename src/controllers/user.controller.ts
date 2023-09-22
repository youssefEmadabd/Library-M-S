import { Request, Response,NextFunction } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User,Admin,Borrower} from '../models';
import logger from '../config/logger';
import { UserService,BorrowerService,AdminService } from '../services';
import Controller from './Controller';
import { IUserInput, IUserOutput, IBorrowerInput, IBorrowerOutput } from "../types";
import ApiError from '../utils/apiError'
import { config } from '../config/config';

const userService = new UserService(User);
const adminService = new AdminService(Admin);
const borrowerService = new BorrowerService(Borrower);
class UserController extends Controller<User,UserService>{
    async login(req: Request, res: Response, next: NextFunction):Promise<any> {
        const { email, password } = req.body;
        const user: IUserOutput[] = (await this.service.get({
            where: {
                "email":email
            }
        }))
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

        const passwordMatch = await bcrypt.compare(`${password}`, user[0].password);
        if (!passwordMatch) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong Credentials")
        }
        const token = await jwt.sign({ sub: user[0].id }, config.jwt.secret, {
            expiresIn: '1h',
        });
        res.status(httpStatus.ACCEPTED).send({
            token,
        });
    }
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password,name} = req.body;
        console.log(req.body)
        const checkUsername = await this.service.isEmailUnique(email);
        if (!checkUsername) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'email already exists');
        }
        const { role } = req.params;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user:IUserOutput = await this.service.create({
            email:email,
            password: hashedPassword,
            name:name
        });
        if(role==1){
            const borrower = await borrowerService.create({userId:user.id})
            if(!borrower) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Could not create borrower");
        }
        else if(role==2){
            const admin = await adminService.create({userId:user.id})
            if(!admin) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Could not create admin");
        }
        const token = await jwt.sign({ sub: user.id, role: role }, config.jwt.secret, {
            expiresIn: '1h',
        });
        res.status(httpStatus.CREATED).send({ ...user, token });
    }
}

export const userController = new UserController(userService);
