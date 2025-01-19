import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { LoginUserCase } from 'src/users/application/use-cases/login-user.usecase';
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
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('Login user usecase', () => {
  let repository: UserRepository;
  let loginUserUseCase: LoginUserCase;
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
        LoginUserCase,
        {
          provide: UserRepositorySymbol,
          useValue: createMock<AuthUserAdapter>(),
        },
      ],
    }).compile();
    repository = moduleRef.get<UserRepository>(UserRepositorySymbol);
    loginUserUseCase = moduleRef.get<LoginUserCase>(LoginUserCase);
  });

  it('execute OK', async () => {
    let username = 'test123';
    let password = 'test';
    let userBD = {
      username,
      roles: [Role.Regular],
      password: 'test',
      _id: 'abc123',
    };
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(repository, 'findUser').mockResolvedValue(userBD as User);
    const responseLogin = await loginUserUseCase.login(username, password);
    expect(responseLogin.username).toBe(userBD.username);
  });

  it('execute Error: Not found user', async () => {
    let username = 'test123';
    let password = 'test';
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(repository, 'findUser').mockResolvedValue(null);
    try {
      await loginUserUseCase.login(username, password);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('execute Error: Invalid credentials', async () => {
    let username = 'test123';
    let password = 'test';
    let userBD = {
      username,
      roles: [Role.Regular],
      password: 'test',
      _id: 'abc123',
    };
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    jest.spyOn(repository, 'findUser').mockResolvedValue(userBD as User);
    try {
      await loginUserUseCase.login(username, password);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });
});
