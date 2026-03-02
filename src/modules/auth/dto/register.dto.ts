import { EnglishLevel, IUserInputs } from 'src/db/interfaces/IUser.interface';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { IsMatchedWith } from 'src/common/decorators/is-matched-with.decorator';
export class RegisterDTO implements IUserInputs {
  @MaxLength(60)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsMatchedWith('password')
  @IsNotEmpty()
  confirmPassword: string;

  @IsEnum(EnglishLevel)
  @IsNotEmpty()
  level: EnglishLevel;
}
