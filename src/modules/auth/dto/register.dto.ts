import { IUserInputs } from 'src/db/interfaces/IUser.interface';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { IsMatchedWith } from 'src/common/decorators/is-matched-with.decorator';
export class RegisterDTO implements IUserInputs {
  @IsString()
  @MaxLength(60)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsMatchedWith('password')
  confirmPassword: string;
}
