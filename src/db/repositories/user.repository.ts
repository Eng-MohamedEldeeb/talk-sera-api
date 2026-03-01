import { Injectable } from '@nestjs/common';
import { DataBaseRepository } from './db.repository';
import { UserDocument, User } from '../models/User.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends DataBaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
