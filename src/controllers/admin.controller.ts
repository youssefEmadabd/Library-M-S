import { Request, Response } from "express";
import {Admin} from "../models";
import logger from "../config/logger";
import { AdminService } from "../services";
import Controller from "./Controller";

const adminService = new AdminService(Admin);

class AdminController extends Controller<Admin,AdminService>{
}

export const adminController = new AdminController(adminService);
