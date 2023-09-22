import { Request, Response } from 'express';
import {User} from '../models';
import logger from '../config/logger';
import { UserService } from '../services';
import Controller from './Controller';

const userService = new UserService(User);
class UserController extends Controller<User,UserService>{
}

export const userController = new UserController(userService);
