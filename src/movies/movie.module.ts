import { Module } from '@nestjs/common';
import { Movie } from './domain/entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './infrastructure/movie.controller';
import { GetMovieUseCase } from './application/use-cases/get-movie.usecase';
import { GetMoviesUseCase } from './application/use-cases/get-movies.usecase';
import { MovieRepositorySymbol } from './domain/ports/movie.repository.port';
import { MovieAdapter } from './infrastructure/adapters/movie.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), JwtModule],
  controllers: [MovieController],
  providers: [
    GetMovieUseCase,
    GetMoviesUseCase,
    {
      provide: MovieRepositorySymbol,
      useClass: MovieAdapter,
    },
  ],
})
export class MovieModule {}
