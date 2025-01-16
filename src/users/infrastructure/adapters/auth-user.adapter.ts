import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseException } from 'src/common/exceptions/database-exception.filter';
import { Role } from 'src/users/domain/entities/role.entity';
import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/ports/user.repository.port';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUser implements UserRepository {
  constructor(
    @InjectRepository(User) private userDBRepository: Repository<User>,
    @InjectRepository(Role) private roleDBRepository: Repository<Role>,
  ) {}

  async findUser(username: string): Promise<User> {
    try {
      const user: User = await this.userDBRepository.findOneOrFail({
        where: { username },
      });
      return user;
    } catch (e) {
      throw new DatabaseException('FIND USER:' + e);
    }
  }

  async saveUser(user: User): Promise<User> {
    try {
      const userDB = await this.userDBRepository.save(user);
      return userDB;
    } catch (e) {
      throw new DatabaseException('SAVE USER:' + e);
    }
  }

  async findRole(name: string): Promise<Role> {
    try {
      const roles = await this.roleDBRepository.findOne({
        where: { name },
      });
      return roles;
    } catch (e) {
      throw new DatabaseException('FIND ROLE:' + e);
    }
  }
}
