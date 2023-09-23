import { Request, Response, NextFunction } from "express";
import { Book } from "../models";
import logger from "../config/logger";
import { BookService } from "../services";
import Controller from "./Controller";
import { IBookOutput } from "../types";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";
import { Op } from "sequelize";

const bookService = new BookService(Book)
class BookController extends Controller<Book, BookService>{
    async search(req: Request, res: Response, next: NextFunction) {
        const { title, author, ISBN } = req.query;
        const books: IBookOutput[] = await this.service.get({
            where: {
                [Op.or]: [
                    { title },
                    { author },
                    { ISBN }
                ]
            }
        })
        console.log(books)
        if (books.length == 0) throw new ApiError(httpStatus.NOT_FOUND, "can not find a book with those params")
    res.status(httpStatus.ACCEPTED).send(books)
    }
}

export const bookController = new BookController(bookService);
