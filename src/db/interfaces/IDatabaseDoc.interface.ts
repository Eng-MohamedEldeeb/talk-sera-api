import { Types } from 'mongoose';

export interface IDataBaseDoc {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
