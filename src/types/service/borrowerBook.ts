import {Optional} from 'sequelize';
import { IBorrower } from './borrower';
import { IBook } from './book';
export interface IBorrowerBook {
  id: number;
  borrowerId: IBorrower;
  bookId: IBook;
  dueDate: Date;
  created_at: Date;
  updated_at: Date;
}
export interface IBorrowerBookInput extends Optional<IBorrowerBook, 'id'> {}
export interface IBorrowerBookOutput extends Required<IBorrowerBook> {}