import { Model, Document, FilterQuery, UpdateQuery, Condition, QueryOptions, ProjectionType, PopulateOptions } from 'mongoose';
import connectToDB from './mongodb';
import { childLogger } from '@/lib/functions/logger';
import { TRExeception } from './exception';
import { ObjectId } from 'mongodb';

export class BaseRepo<T extends Document> {
    protected _name: string;
    protected model: Model<T>;
    connection = connectToDB;
    logger;

    constructor(name: string, model: Model<T>) {
        this._name = name;
        this.model = model;

        this.logger = childLogger(name);
    }

    async execute(fn: Function, errorHandler?: (err: any) => void) {
        await this.connection();
        try {
            return await fn();
        } catch (error) {
            console.log(error);
            if (errorHandler !== undefined) {
                errorHandler(error);
            } else {
                this.logger.error({ error }, 'Error executing');
            }
            throw error;
        }
    }

    async getOne(
        filters?: FilterQuery<T>,
        fields?: ProjectionType<T>,
        extras?: {
            populate?: PopulateOptions;
        }
    ): Promise<T | null> {
        await this.connection();
        try {
            const itemQuery = this.model.findOne(filters, fields);
            if (extras) {
                if (extras.populate) {
                    itemQuery.populate(extras.populate);
                }
            }
            return (await itemQuery)?.toObject() || null;
        } catch (error) {
            this.logger.error({ error }, 'Error fetching document');
            throw error;
        }
    }

    async getAll(
        options?: QueryOptions<T>,
        filters: FilterQuery<T> | undefined = {},
        fields?: ProjectionType<T>,
        extras?: {
            populate?: PopulateOptions;
        }
    ): Promise<{ items: T[] | null; total: number }> {
        await this.connection();
        try {
            const itemQuery = this.model.find(filters, fields, options);
            if (extras) {
                if (extras.populate) {
                    itemQuery.populate(extras.populate);
                }
            }
            const items = (await itemQuery.lean()) as T[];
            const total = await this.model.countDocuments(filters);
            return { items, total };
        } catch (error) {
            console.log(error);
            this.logger.error({ error }, 'Error fetching all document');
            throw error;
        }
    }

    async update(data: UpdateQuery<T>, _id?: string, conditions?: Condition<T>): Promise<T | null> {
        let updateCondition = null;
        if (_id) {
            updateCondition = { _id: new ObjectId(_id) };
        }
        if (updateCondition === null && conditions) {
            updateCondition = conditions;
        }
        if (updateCondition === null && data._id) {
            updateCondition = { _id: new ObjectId(data._id) };
        }
        if (updateCondition === null) {
            throw new TRExeception('Update condition is not correct');
        }

        await this.connection();
        try {
            const document = await this.model.findOneAndUpdate(updateCondition, data, { new: true });
            return document;
        } catch (error) {
            this.logger.error({ error }, 'Error updating document');
            throw error;
        }
    }
}
