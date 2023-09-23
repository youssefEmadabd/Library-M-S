import { Request, Response, NextFunction } from "express";
import { Borrower, User, Book, BorrowerBook } from "../models";
import logger from "../config/logger";
import Controller from "./Controller";
import { BorrowerService, UserService, BookService } from '../services'
import { IBookOutput, IBorrowerBookOutput, IBorrowerOutput, IUserOutput } from "../types";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";
import { userController } from "./user.controller";

const borrowerService = new BorrowerService(Borrower);
const userService = new UserService(User);
const bookService = new BookService(Book);
class BorrowerController extends Controller<Borrower, BorrowerService>{
    async delete(req: Request, res: Response) {
        const user: IUserOutput[] = await userService.get({ where: { id: req.user.sub } })
        if (user.length == 0) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        const borrower: number = await this.service.delete({ where: { userId: user[0].id } })
        await userService.delete({ where: { id: user[0].id } })
        res.status(httpStatus.NO_CONTENT).send({ affected: borrower });
    }
    async update(req: Request, res: Response) {
        req.params.id = req.user.sub;
        userController.update(req, res);
    }
    async checkBook(req: Request, res: Response) {
        const { bookId } = req.params;
        const id = req.user.sub;
        const currentBook = await bookService.get({ where: { id: bookId } });
        if (currentBook.length == 0) throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
        if (currentBook[0].quantity <= 0) throw new ApiError(httpStatus.NOT_ACCEPTABLE, "there is no enough books for borrowing");
        await bookService.update({ quantity: currentBook[0].quantity - 1 }, { where: { id: currentBook[0].id } })
        const today = new Date()
        const dueDate = today.setMonth(today.getMonth() + 1);
        const borrower:any = await borrowerService.get({where:{id}})
        // currentBook[0].add();
        // const borrowerBook: object = await BorrowerBook.create({ borrowerId: id, bookId: bookId, dueDate: dueDate });
        res.status(httpStatus.ACCEPTED).send({ ...currentBook[0] });
    }
    
}

export const borrowerController = new BorrowerController(borrowerService);
