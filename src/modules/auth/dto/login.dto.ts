import { IUserInputs } from 'src/db/interfaces/IUser.interface';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDTO implements Pick<IUserInputs, 'email' | 'password'> {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
