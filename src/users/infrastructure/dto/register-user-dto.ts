import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword: string;
}
