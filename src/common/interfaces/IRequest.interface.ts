import { Request } from 'express';
import { UserDocument } from 'src/db/models/User.model';

export interface IRequest extends Request {
  user: UserDocument;
}
