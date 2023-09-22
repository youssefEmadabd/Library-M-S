import {Optional} from 'sequelize';
import { IUser } from './user';
export interface IBorrower {
  id: number;
  userId: IUser;
  created_at: Date;
  updated_at: Date;
}
export interface IBorrowerInput extends Optional<IBorrower, 'id'> {}
export interface IBorrowerOutput extends Required<IBorrower> {}