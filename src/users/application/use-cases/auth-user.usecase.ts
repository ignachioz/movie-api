import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/domain/entities/user.entity';
import {
  UserRepositorySymbol,
  UserRepository,
} from 'src/users/domain/ports/user.repository.port';

export class AuthUserUseCase {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const user: User = await this.userRepository.findByUsername(username);
    const jwt = await this.jwtService.signAsync({
      user: user.username,
      roles: user.roles,
    });
    return jwt;
  }

  async register(username: string, password: string): Promise<boolean> {
    const user: User = await this.userRepository.findByUsername(username);
    return true;
  }
}
