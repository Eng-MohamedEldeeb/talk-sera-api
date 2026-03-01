import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  IFIndByIdAndUpdate,
  IFindByIdOptions,
  IFIndOneIdAndUpdate,
  IFindOneOptions,
  IFindQuery,
} from '../interfaces/IDatabase.interface';
import { MultipleReturn, SingleReturn } from '../types/database-repo.type';

@Injectable()
export abstract class DataBaseRepository<TDocument> {
  constructor(private readonly model: Model<TDocument>) {}

  public readonly create = (data: Partial<TDocument>): Promise<TDocument> => {
    return this.model.create(data);
  };

  public readonly find = async ({
    filter,
    projection,
    page,
    sort,
    populate,
    options,
  }: IFindQuery<TDocument>): MultipleReturn<TDocument> => {
    const query = this.model.find(filter || {});

    if (projection) {
      projection =
        typeof projection == 'string'
          ? projection.replaceAll(',', ' ')
          : projection;
      query.select(projection || {});
    }
    if (sort) {
      sort = sort.replaceAll(',', ' ');
      query.sort(sort);
    }
    if (populate) {
      query.populate(populate);
    }
    if (options) {
      query.setOptions(options);
    }
    if (!page) {
      return await query.exec();
    }

    const limit = 10;
    const skip = (page - 1) * limit;
    const count = await this.model.countDocuments(filter || {});
    const pages = Math.ceil(count / limit);
    const documents = await query.skip(skip).limit(limit).exec();
    return {
      count,
      pageSize: limit,
      pages,
      documents,
    };
  };

  public readonly findById = ({
    id,
    projection,
    options,
    populate,
  }: IFindByIdOptions<TDocument>): SingleReturn<TDocument> => {
    return this.model
      .findById(id, projection, options)
      .populate(populate || []);
  };

  public readonly findOne = ({
    filter,
    projection,
    options,
    populate,
  }: IFindOneOptions<TDocument>): SingleReturn<TDocument> => {
    return this.model
      .findOne(filter, projection, options)
      .populate(populate || []);
  };

  public readonly updateById = ({
    id,
    data,
    options,
  }: IFIndByIdAndUpdate<TDocument>): SingleReturn<TDocument> => {
    return this.model.findByIdAndUpdate(id, data, options);
  };

  updateOne({ filter, data, options }: IFIndOneIdAndUpdate<TDocument>) {
    return this.model.findOneAndUpdate(filter, data, options);
  }

  public readonly findByIdAndUpdate = async ({
    id,
    data,
    options = {},
  }: IFIndByIdAndUpdate<TDocument>): Promise<TDocument | null> => {
    return await this.model.findByIdAndUpdate(id, data, options);
  };
}
