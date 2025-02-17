import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ required: true, example: 'martin123' })
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Field username must be between 8 and 20 characters',
  })
  username: string;
  @ApiProperty({ required: true, example: '12312312' })
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Field password must be between 8 and 20 characters',
  })
  password: string;
}
