import { IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Field username must be between 8 and 20 characters',
  })
  username: string;
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Field password must be between 8 and 20 characters',
  })
  password: string;
}
