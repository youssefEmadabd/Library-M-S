import {Service} from "./Service";
import {User} from '../models'
import { IUserOutput } from "../types";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";

export class UserService extends Service<User>{
    async isEmailUnique(email: string): Promise<boolean> {
        const user: IUserOutput = await User.findOne({ where:{email:email} });
        if (user) {
            return false;
        }
        return true;
    }
}