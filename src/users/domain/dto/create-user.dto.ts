import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Field username must be between 8 and 20 characters',
  })
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Field password must be between 8 and 20 characters',
  })
  password: string;
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Field confirmPassword must be between 8 and 20 characters',
  })
  @ApiProperty()
  confirmPassword: string;
  @IsOptional()
  @IsEnum(Role, {
    each: true,
    message: 'ROLES NOT VALID, ROLES VALID: ADMINISTRATOR - REGULAR',
  })
  @ApiProperty({ required: false, example: [Role.Administrator, Role.Regular] })
  roles: Role[] = [];
}
