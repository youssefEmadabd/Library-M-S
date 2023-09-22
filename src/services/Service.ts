import httpStatus from 'http-status';
import autoBind from 'auto-bind';
import { CreateOptions, DestroyOptions, Model, Optional, UpdateOptions, ModelStatic, FindOptions } from 'sequelize';

import ApiError from '../utils/apiError';

class Service<IModel> {
    model: ModelStatic<any>;
    constructor(model: ModelStatic<any>) {
        this.model = model;
        autoBind(this);
    }

    /**
   * Create a new entry
   * @param {Optional<IModel,any>} body - To be created
   * @returns {Promise<Required<IModel>>} Created entry
   */
    async create(body: Optional<IModel, any>): Promise<Required<IModel>> {
        const currentObject: Required<IModel> = await this.model.create(body);
        return currentObject;
    }

    /**
     * Get all rows which resolve with the where clause
     * @param {object} options - Query options
     * @returns {Promise<Required<IModel>>} Found rows
     */
    async get(
        options: FindOptions<IModel>,
    ): Promise<Required<IModel>[]> {
        const currentObject: Required<IModel>[] = await this.model.findAll(options)
        return currentObject;
    }
    /**
     * update rows which resolve with the where clause
     * @param {Optional<IModel,any>} updateBody - Query options
     * @param {UpdateOptions} options - Query options
     * @returns {Promise<Required<IModel>[]>} returned row/s
     */
    async update(updateBody: Optional<IModel, any>,
        options: UpdateOptions,
    ): Promise<[affectedCount: number]> {
        const currentObject:[affectedCount: number]= await this.model.update(
            updateBody,
            options
        )
        if (!currentObject)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `${Model.tableName} not found`,
            );
        return currentObject;
    }

    /**
     * @param {DestroyOptions<IModel>} options
     * @returns {Promise<number>} deleted Row
     */
    async delete(options: DestroyOptions<IModel>): Promise<number> {
        const deletedCount:number = await this.model.destroy(options);
        if (!deletedCount)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `${Model.tableName} not found`,
            );
        return deletedCount;
    }
}

export { Service }