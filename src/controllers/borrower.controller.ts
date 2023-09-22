import { Request, Response } from "express";
import {Borrower} from "../models";
import logger from "../config/logger";
import Controller from "./Controller";
import {BorrowerService} from '../services'

const borrowerService = new BorrowerService(Borrower)
class BorrowerController extends Controller<Borrower,BorrowerService>{
}

export const borrowerController = new BorrowerService(Borrower);
