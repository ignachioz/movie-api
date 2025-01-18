import { BadRequestException, ConflictException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/domain/entities/user.entity';
import {
  UserRepositorySymbol,
  UserRepository,
} from 'src/users/domain/ports/user.repository.port';
import * as bcrypt from 'bcrypt';
import { AuthUserMapper } from '../mapper/auth-user.mapper';
import { UserDto } from '../dto/user.dto';
import { Role } from 'src/users/domain/entities/role.entity';
import { CreateUserDto } from 'src/users/domain/dto/create-user.dto';

export class RegisterUserUseCase {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto): Promise<UserDto> {
    if (body.password !== body.confirmPassword)
      throw new BadRequestException('PASSWORD NOT MATCH');
    const existUser = await this.userRepository.findUser(body.username);
    if (existUser) throw new ConflictException('USER ALREADY REGISTERED');

    body.password = await this.hashPassword(body.password);

    body.roles = [...new Set([...body.roles, Role.Regular])];
    const user: User = await this.userRepository.saveUser(body);
    return AuthUserMapper.userToDto(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
