import { UserRepositorySymbol } from './../domain/ports/user.repository.port';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthUserUseCase } from '../application/use-cases/auth-user.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthUser } from './adapters/auth-user.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
    AuthUserUseCase,
    {
      provide: UserRepositorySymbol,
      useClass: AuthUser,
    },
  ],
  exports: [],
})
export class UserModule {}
