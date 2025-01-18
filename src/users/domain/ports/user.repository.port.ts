import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  findUser(username: string): Promise<User>;
  saveUser(creteUser: CreateUserDto): Promise<User>;
}

export const UserRepositorySymbol = Symbol('UserRepository');
