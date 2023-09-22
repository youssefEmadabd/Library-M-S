import {Optional} from 'sequelize';
import {IBorrower} from './borrower';
export interface IBook {
  id: number;
  borrower?: IBorrower;
  title: string;
  author: string;
  ISBN: string;
  quantity: number;
  shelfLocation: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IBookInput extends Optional<IBook, 'id' | 'ISBN'> {}
export interface IBookOutput extends Required<IBook> {}