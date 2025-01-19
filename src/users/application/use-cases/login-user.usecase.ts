import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/domain/entities/user.entity';
import {
  UserRepositorySymbol,
  UserRepository,
} from 'src/users/domain/ports/user.repository.port';
import * as bcrypt from 'bcrypt';
import { AuthUserMapper } from '../mapper/auth-user.mapper';
import { JwtDto } from '../dto/jwt.dto';

export class LoginUserCase {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<JwtDto> {
    const user: User = await this.userRepository.findUser(username);
    if (!user) throw new NotFoundException("USER DOESN'T EXIST");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('INVALID CREDENTIALS');
    const jwt = await this.jwtService.signAsync({
      user: user.username,
      roles: user.roles,
    });
    return AuthUserMapper.jwtToDto(jwt, username);
  }
}
