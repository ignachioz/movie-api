import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UserDto } from '../application/dto/user.dto';
import { JwtDto } from '../application/dto/jwt.dto';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { LoginUserDto } from '../domain/dto/login-user.dto';
import { LoginUserCase } from '../application/use-cases/login-user.usecase';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/exceptions/error-response';

@Controller('user')
@ApiConflictResponse({ description: 'Conflict exception', type: ErrorResponse })
@ApiNotFoundResponse({ description: 'Notfound exception', type: ErrorResponse })
@ApiInternalServerErrorResponse({
  description: 'Internal server exception',
  type: ErrorResponse,
})
export class UserController {
  constructor(
    private readonly registerUserCase: RegisterUserUseCase,
    private readonly loginUserCase: LoginUserCase,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user', description: 'Login user' })
  @ApiOkResponse({
    description: 'Login user successfull',
    type: JwtDto,
  })
  async login(@Body() body: LoginUserDto): Promise<JwtDto> {
    return this.loginUserCase.login(body.username, body.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user', description: 'Register user' })
  @ApiOkResponse({
    description: 'Register user successfull',
    type: UserDto,
  })
  async register(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.registerUserCase.register(body);
  }
}
