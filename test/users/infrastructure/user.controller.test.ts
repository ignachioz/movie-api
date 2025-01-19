import { Test } from '@nestjs/testing';
import { JwtDto } from 'src/users/application/dto/jwt.dto';
import { RoleDto } from 'src/users/application/dto/role.dto';
import { UserDto } from 'src/users/application/dto/user.dto';
import { LoginUserCase } from 'src/users/application/use-cases/login-user.usecase';
import { RegisterUserUseCase } from 'src/users/application/use-cases/register-user.usecase';
import { CreateUserDto } from 'src/users/domain/dto/create-user.dto';
import { LoginUserDto } from 'src/users/domain/dto/login-user.dto';
import { Role } from 'src/users/domain/entities/role.entity';
import { UserRepositorySymbol } from 'src/users/domain/ports/user.repository.port';
import { AuthUserAdapter } from 'src/users/infrastructure/adapters/auth-user.adapter';
import { UserController } from 'src/users/infrastructure/user.controller';

describe('UserController', () => {
  let controller: UserController;
  let loginUserUseCase: LoginUserCase;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: LoginUserCase,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: RegisterUserUseCase,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    loginUserUseCase = module.get<LoginUserCase>(LoginUserCase);
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  it('login success', async () => {
    let username = 'test123';
    let password = '12312312';
    let loginUserDto = new LoginUserDto();
    loginUserDto.username = username;
    loginUserDto.password = password;
    jest
      .spyOn(loginUserUseCase, 'login')
      .mockImplementation(() =>
        Promise.resolve(new JwtDto('abc123', username)),
      );
    const controllerResult = await controller.login(loginUserDto);
    expect(controllerResult.username).toBe(username);
    expect(controllerResult.jwt).not.toBeNull();
  });

  it('register success', async () => {
    let createUserDto = new CreateUserDto();
    createUserDto.username = 'pepito123';
    createUserDto.password = 'testpassword123';
    createUserDto.confirmPassword = 'testpassword123';
    createUserDto.roles = [Role.Administrator, Role.Regular];
    jest
      .spyOn(registerUserUseCase, 'register')
      .mockImplementation(() =>
        Promise.resolve(
          new UserDto('cfd5774b-b1e9-4742-a211-a320246a6cc8', 'pepito123', [
            RoleDto.Administrator,
            RoleDto.Regular,
          ]),
        ),
      );
    const controllerResult = await controller.register(createUserDto);
    expect(controllerResult.id).toBe('cfd5774b-b1e9-4742-a211-a320246a6cc8');
    expect(controllerResult.username).toBe('pepito123');
    expect(controllerResult.roles).toMatchObject([
      RoleDto.Administrator,
      RoleDto.Regular,
    ]);
  });
});
