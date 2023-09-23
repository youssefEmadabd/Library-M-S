import { Response as IRes } from 'express';
import httpStatus from 'http-status';

import { Service } from '../services';
import ApiError from '../utils/apiError';
import { RequestInterface as IReq } from '../types';
import autoBind from 'auto-bind';
import { UpdateOptions } from 'sequelize';

class Controller<IModel, MyService extends Service<IModel>> {
    service: MyService;
    constructor(service: MyService) {
        this.service = service;
        autoBind(this);
    }

    async create(req: IReq, res: IRes): Promise<void> {
        try {
            const result = await this.service.create({
                ...req.body,
            });
            res.status(httpStatus.CREATED).send(result);
        } catch (err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    }

    async get(req: IReq, res: IRes): Promise<void> {
        try {
            const id = req.params.id;
            const filter: object = { where: { id } };
            const result = await this.service.get(filter);
            if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
            res.status(httpStatus.ACCEPTED).send({ ...result });
        } catch (err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    }

    async getAll(req: IReq, res:IRes): Promise<void>{
        const result = await this.service.get({});
        res.status(httpStatus.ACCEPTED).send({ ...result });
    }

    async update(req: IReq, res: IRes): Promise<void> {
        try {
            const id = req.params.id;
            const filter: Omit<UpdateOptions<any>, "Returning"> = { where: { id } };
            const result = await this.service.update(req.body, filter);
            res.status(httpStatus.OK).send(result);
        } catch (err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    }

    async delete(req: IReq, res: IRes): Promise<void> {
        try {
            const id: string = req.params.id;
            const filter: object = { where:{id} };
            const result = await this.service.delete(filter);
            if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
            res.status(httpStatus.NO_CONTENT).send({result});
        } catch (err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    }
}

export default Controller;