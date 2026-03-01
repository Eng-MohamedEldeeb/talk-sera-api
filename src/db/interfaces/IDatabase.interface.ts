import {
  PopulateOptions,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  Types,
  UpdateQuery,
} from 'mongoose';

interface IQueryOptions<T> {
  projection?: ProjectionType<T> | string;
  options?: QueryOptions<T>;
  populate?: PopulateOptions | PopulateOptions[];
}
export interface IFindQuery<T> extends IQueryOptions<T> {
  filter?: QueryFilter<T>;
  sort?: string;
  page?: number;
}
export interface IUpdateOptions<T> {
  data: UpdateQuery<T>;
  options?: QueryOptions<T>;
}
export interface IFindByIdOptions<T> extends IQueryOptions<T> {
  id: Types.ObjectId | string;
}

export interface IFIndByIdAndUpdate<T> extends IUpdateOptions<T> {
  id: Types.ObjectId | string;
}
export interface IFIndOneIdAndUpdate<T> extends IUpdateOptions<T> {
  filter: QueryFilter<T>;
}

export interface IFindOneOptions<T> extends IQueryOptions<T> {
  filter: QueryFilter<T>;
}
export interface IUpdateById<T> extends IUpdateOptions<T> {
  id: Types.ObjectId | string;
}
