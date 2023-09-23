import { Request, Response } from "express";
import {Admin, Borrower, User} from "../models";
import logger from "../config/logger";
import { AdminService, BorrowerService } from "../services";
import Controller from "./Controller";
import { IBorrowerOutput } from "../types";
import httpStatus from "http-status";


const borrowerService = new BorrowerService(Borrower);
const adminService = new AdminService(Admin);

class AdminController extends Controller<Admin,AdminService>{
    async getAllBorrowers(req:Request,res:Response){
        const borrowers = await borrowerService.get({include: [{
            model: User,
            required: true
           }]});
        res.status(httpStatus.ACCEPTED).send(borrowers)
    }
}

export const adminController = new AdminController(adminService);
