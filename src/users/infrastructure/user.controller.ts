import { AuthUserUseCase } from './../application/use-cases/auth-user.usecase';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';
import { RegisterUserDto } from './dto/register-user-dto';
import { UserDto } from '../application/dto/user.dto';
import { JwtDto } from '../application/dto/jwt.dto';

@Controller('user')
export class UserController {
  constructor(private readonly authUserUseCase: AuthUserUseCase) {}

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<JwtDto> {
    return this.authUserUseCase.login(body.username, body.password);
  }

  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<UserDto> {
    return this.authUserUseCase.register(
      body.username,
      body.password,
      body.confirmPassword,
    );
  }
}
