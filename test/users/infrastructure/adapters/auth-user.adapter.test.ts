import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DatabaseException } from 'src/common/exceptions/database-exception';
import { CreateUserDto } from 'src/users/domain/dto/create-user.dto';
import { Role } from 'src/users/domain/entities/role.entity';
import { User } from 'src/users/domain/entities/user.entity';
import { AuthUserAdapter } from 'src/users/infrastructure/adapters/auth-user.adapter';

describe('AuthAdapter', () => {
  let authAdapter: AuthUserAdapter;
  let userModel: Model<User>;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthUserAdapter,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    authAdapter = moduleRef.get<AuthUserAdapter>(AuthUserAdapter);
    userModel = moduleRef.get<Model<User>>(getModelToken(User.name));
  });

  it('find user OK', async () => {
    let username = 'prueba123';
    let id = 'cfd5774b-b1e9-4742-a211-a320246a6cc8';
    let roles = [Role.Regular];
    userModel.findOne = jest
      .fn()
      .mockResolvedValue({ username, _id: id, roles });
    const user = await authAdapter.findUser(username);
    expect(user.username).toEqual(username);
    expect(user._id).toEqual(id);
    expect(user.roles).toEqual(roles);
  });

  it('find user error', async () => {
    let username = 'prueba123';
    userModel.findOne = jest
      .fn()
      .mockRejectedValue(new Error('EXCEPTION DATABASE'));
    try {
      await authAdapter.findUser(username);
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });

  it('save user OK', async () => {
    let createUserDto = new CreateUserDto();
    createUserDto.username = 'pepe123';
    createUserDto.password = '12345123';
    createUserDto.confirmPassword = '12345123';
    createUserDto.roles = [Role.Administrator];
    let userCreated = createUserDto;
    userModel.create = jest.fn().mockResolvedValue(userCreated);

    const user = await authAdapter.saveUser(createUserDto);
    expect(user).toEqual(userCreated);
  });

  it('save user error', async () => {
    let createUserDto = new CreateUserDto();
    createUserDto.username = 'pepe123';
    createUserDto.password = '12345123';
    createUserDto.confirmPassword = '12345123';
    createUserDto.roles = [Role.Administrator];
    userModel.create = jest
      .fn()
      .mockRejectedValue(new Error('EXCEPTION DATABASE'));
    try {
      await authAdapter.saveUser(createUserDto);
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });
});
