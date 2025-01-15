import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      throw new Error('' + e);
    }
  }

  async registerUser(username: string, password: string): Promise<User> {
    const userRegister = new User();
    const roles = await this.roleDBRepository.findBy({ name: 'REGULAR' });
    if (roles.length == 0) throw new Error('ROLE NOT FOUND');
    const userInDB = this.userDBRepository.findOne({ where: { username } });
    if (userInDB) throw new Error('USER EXIST');
    userRegister.username = username;
    userRegister.password = password;
    userRegister.roles = roles;
    const userSaved = await this.userDBRepository.save(userRegister);
    return userSaved;
  }

  async saveUser(user: User): Promise<User> {
    try {
      const userDB = await this.userDBRepository.save(user);
      return userDB;
    } catch (e) {
      console.log('FAIL SAVE USER');
    }
  }

  async findRole(name: string): Promise<Role> {
    try {
      const roles = await this.roleDBRepository.findOne({
        where: { name },
      });
      return roles;
    } catch (e) {
      throw new Error('' + e);
    }
  }
}
