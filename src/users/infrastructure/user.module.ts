import { UserRepositorySymbol } from './../domain/ports/user.repository.port';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthUserUseCase } from '../application/use-cases/auth-user.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthUserAdapter } from './adapters/auth-user.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { Role } from '../domain/entities/role.entity';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import { MovieController } from 'src/movies/infrastructure/movie.controller';
import { GetMovieUseCase } from 'src/movies/application/use-cases/get-movie.usecase';
import { MovieRepositorySymbol } from 'src/movies/domain/ports/movie.repository.port';
import { MovieAdapter } from 'src/movies/infrastructure/adapters/movie.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Movie]),
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
  controllers: [UserController, MovieController],
  providers: [
    AuthUserUseCase,
    GetMovieUseCase,
    {
      provide: UserRepositorySymbol,
      useClass: AuthUserAdapter,
    },
    {
      provide: MovieRepositorySymbol,
      useClass: MovieAdapter,
    },
  ],
  exports: [],
})
export class UserModule {}
