import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequest } from '../interfaces/IRequest.interface';
import { IUser } from 'src/db/interfaces/IUser.interface';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<IRequest>().user;
    return data ? user?.[data as keyof IUser] : user;
  },
);
