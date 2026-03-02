import { IUserInputs } from 'src/db/interfaces/IUser.interface';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ForgotPasswordDTO implements Pick<IUserInputs, 'email'> {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDTO {
  @IsStrongPassword()
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  token: string;
}
