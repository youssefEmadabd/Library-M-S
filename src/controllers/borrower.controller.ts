import { Request, Response, NextFunction } from "express";
import { Borrower, User } from "../models";
import logger from "../config/logger";
import Controller from "./Controller";
import { BorrowerService, UserService } from '../services'

class BorrowerController extends Controller<Borrower, BorrowerService>{
    
}

export const borrowerController = new BorrowerService(Borrower);
