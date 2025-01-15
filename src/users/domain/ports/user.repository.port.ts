import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

export interface UserRepository {
  findUser(username: string): Promise<User>;
  saveUser(user: User): Promise<User>;
  findRole(name: string): Promise<Role>;
}

export const UserRepositorySymbol = Symbol('UserRepository');
