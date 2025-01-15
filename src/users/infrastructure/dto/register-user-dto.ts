import { IsNotEmpty, Length, Matches, min } from 'class-validator';

export class RegisterUserDto {
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
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Field confirmPassword must be between 8 and 20 characters',
  })
  confirmPassword: string;
}
