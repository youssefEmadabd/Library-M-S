import {Optional} from 'sequelize'
import { IUser } from './user';

export interface IAdmin {
    id: number;
    userId: IUser;
    created_at: Date;
    updated_at: Date;
}
export interface IAdminInput extends Optional<IAdmin, 'id'> {}
export interface IAdminOutput extends Required<IAdmin> {}