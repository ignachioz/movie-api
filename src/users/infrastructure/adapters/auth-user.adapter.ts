import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseException } from 'src/common/exceptions/database-exception';
import { CreateUserDto } from 'src/users/domain/dto/create-user.dto';
import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/ports/user.repository.port';

@Injectable()
export class AuthUserAdapter implements UserRepository {
  constructor(@InjectModel(User.name) private userDBRepository: Model<User>) {}

  async findUser(username: string): Promise<User> {
    try {
      const data = await this.userDBRepository.findOne({ username }).exec();
      return data;
    } catch (e) {
      throw new DatabaseException('FIND USER:' + e);
    }
  }

  async saveUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userDBRepository(createUserDto);
      return await this.userDBRepository.create(user);
    } catch (e) {
      throw new DatabaseException('SAVE USER:' + e);
    }
  }
}
