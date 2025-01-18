import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UserDto } from '../application/dto/user.dto';
import { JwtDto } from '../application/dto/jwt.dto';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { LoginUserDto } from '../domain/dto/login-user.dto';
import { LoginUserCase } from '../application/use-cases/login-user.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly registerUserCase: RegisterUserUseCase,
    private readonly loginUserCase: LoginUserCase,
  ) {}

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<JwtDto> {
    return this.loginUserCase.login(body.username, body.password);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.registerUserCase.register(body);
  }
}
