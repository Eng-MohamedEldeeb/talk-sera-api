import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/db/models/User.model';
import { IRequest } from '../interfaces/IRequest.interface';

export const User = createParamDecorator(
  (data: keyof UserDocument, context: ExecutionContext) => {
    const user: UserDocument | undefined = context
      .switchToHttp()
      .getRequest<IRequest>().user;

    if (user && data) {
      return user[data];
    }

    return user;
  },
);
