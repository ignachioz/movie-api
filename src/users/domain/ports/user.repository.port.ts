import { User } from '../entities/user.entity';

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  saveUser(user: User);
}

export const UserRepositorySymbol = Symbol('UserRepository');
