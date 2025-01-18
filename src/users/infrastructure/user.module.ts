import { UserRepositorySymbol } from './../domain/ports/user.repository.port';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthUserAdapter } from './adapters/auth-user.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from '../domain/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginUserCase } from '../application/use-cases/login-user.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    LoginUserCase,
    {
      provide: UserRepositorySymbol,
      useClass: AuthUserAdapter,
    },
  ],
  exports: [],
})
export class UserModule {}
