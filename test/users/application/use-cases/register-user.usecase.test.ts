import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import {
  UserRepository,
  UserRepositorySymbol,
} from 'src/users/domain/ports/user.repository.port';
import { AuthUserAdapter } from 'src/users/infrastructure/adapters/auth-user.adapter';
import { createMock } from '@golevelup/ts-jest';
import { User } from 'src/users/domain/entities/user.entity';
import { Role } from 'src/users/domain/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserUseCase } from 'src/users/application/use-cases/register-user.usecase';
import { CreateUserDto } from 'src/users/domain/dto/create-user.dto';

describe('Login user usecase', () => {
  let repository: UserRepository;
  let registerUserUseCase: RegisterUserUseCase;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule,
        JwtModule.register({
          secret: 'abc123',
        }),
      ],
      providers: [
        ConfigService,
        RegisterUserUseCase,
        {
          provide: UserRepositorySymbol,
          useValue: createMock<AuthUserAdapter>(),
        },
      ],
    }).compile();
    repository = moduleRef.get<UserRepository>(UserRepositorySymbol);
    registerUserUseCase =
      moduleRef.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  it('execute OK', async () => {
    let createUserDto = new CreateUserDto();
    createUserDto.username = 'pepito123';
    createUserDto.password = 'testpassword123';
    createUserDto.confirmPassword = 'testpassword123';
    createUserDto.roles = [Role.Administrator, Role.Regular];
    let username = 'test123';
    let userBD = {
      username,
      roles: [Role.Regular],
      password: 'test',
      _id: 'abc123',
    };
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(repository, 'findUser').mockResolvedValue(null);
    jest.spyOn(repository, 'saveUser').mockResolvedValue(userBD as User);
    const responseLogin = await registerUserUseCase.register(createUserDto);
    expect(responseLogin.username).toBe(userBD.username);
  });

  it('execute Error: User exist', async () => {
    let createUserDto = new CreateUserDto();
    createUserDto.username = 'pepito123';
    createUserDto.password = 'testpassword123';
    createUserDto.confirmPassword = 'testpassword123';
    createUserDto.roles = [Role.Administrator, Role.Regular];
    let username = 'test123';
    let userBD = {
      username,
      roles: [Role.Regular],
      password: 'test',
      _id: 'abc123',
    };
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(repository, 'findUser').mockResolvedValue(userBD as User);
    try {
      await registerUserUseCase.register(createUserDto);
    } catch (e) {
      expect(e).toBeInstanceOf(ConflictException);
    }
  });

  it('execute Error: Password and confirmanPassword not match', async () => {
    let createUserDto = new CreateUserDto();
    createUserDto.username = 'pepito123';
    createUserDto.password = 'testpassword123';
    createUserDto.confirmPassword = 'testpassword1234';
    createUserDto.roles = [Role.Administrator, Role.Regular];
    let username = 'test123';
    let userBD = {
      username,
      roles: [Role.Regular],
      password: 'test',
      _id: 'abc123',
    };
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(repository, 'findUser').mockResolvedValue(userBD as User);
    try {
      await registerUserUseCase.register(createUserDto);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
});
