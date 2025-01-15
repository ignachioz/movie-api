import { Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/ports/user.repository.port';

@Injectable()
export class AuthUser implements UserRepository {
  findByUsername(username: string): Promise<User | null> {
    return Promise.resolve({
      id: '1',
      username: 'ignachioz',
      password: '1234',
      roles: [
        { name: 'ADMINISTRADOR', id: 1 },
        { name: 'REGULAR', id: 1 },
      ],
    });
  }

  saveUser(user: User) {
    throw new Error('Method not implemented.');
  }
}
