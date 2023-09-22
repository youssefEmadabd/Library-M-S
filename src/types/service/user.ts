import {Optional} from 'sequelize'

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
export interface IUserInput extends Optional<IUser, 'id' | 'email'> {}
export interface IUserOutput extends Required<IUser> {}