import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/domain/entities/user.entity';
import {
  UserRepositorySymbol,
  UserRepository,
} from 'src/users/domain/ports/user.repository.port';
import * as bcrypt from 'bcrypt';
import { AuthUserMapper } from '../mapper/auth-user.mapper';
import { UserDto } from '../dto/user.dto';
import { JwtDto } from '../dto/jwt.dto';
import { ROLE } from 'src/constants/user-contants';

export class AuthUserUseCase {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<JwtDto> {
    const user: User = await this.userRepository.findUser(username);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('INVALID CREDENTIALS');
    const jwt = await this.jwtService.signAsync({
      user: user.username,
      roles: user.roles,
    });
    return AuthUserMapper.jwtToDto(jwt);
  }

  async register(
    username: string,
    password: string,
    confirmPassword: string,
  ): Promise<UserDto> {
    if (password !== confirmPassword)
      throw new BadRequestException('PASSWORD NOT MATCH');
    const role = await this.userRepository.findRole(ROLE.REGULAR);
    if (!role) throw new NotFoundException('ROLE NOT FOUND');
    const existUser = await this.userRepository.findUser(username);
    if (existUser) throw new ConflictException('USER ALREADY REGISTERED');

    const passwordHash = await this.hashPassword(password);
    const userRegister = new User();
    userRegister.username = username;
    userRegister.password = passwordHash;
    userRegister.roles = [role];
    const user: User = await this.userRepository.saveUser(userRegister);
    return AuthUserMapper.userToDto(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
