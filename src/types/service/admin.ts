import {Optional} from 'sequelize'
import { IUser } from './user';

export interface IAdmin {
    id: number;
    userId: IUser;
    createdAt: Date;
    updatedAt: Date;
}
export interface IAdminInput extends Optional<IAdmin, 'id'> {}
export interface IAdminOutput extends Required<IAdmin> {}