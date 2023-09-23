import {Optional} from 'sequelize';
export interface IBook {
  id: number;
  title: string;
  author: string;
  ISBN: string;
  quantity: number;
  shelfLocation: number;
  created_at: Date;
  updated_at: Date;
}
export interface IBookInput extends Optional<IBook, 'id' | 'ISBN'> {}
export interface IBookOutput extends Required<IBook> {}