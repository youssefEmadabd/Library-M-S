import { Request, Response } from "express";
import {Book} from "../models";
import logger from "../config/logger";
import { BookService } from "../services";
import Controller from "./Controller";

const bookService = new BookService(Book)
class BookController extends Controller<Book,BookService>{
}

export const bookController = new BookController(bookService);
