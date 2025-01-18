import { Module } from '@nestjs/common';
import { Movie, MovieSchema } from './domain/entities/movie.entity';
import { MovieController } from './infrastructure/movie.controller';
import { GetMovieUseCase } from './application/use-cases/get-movie.usecase';
import { GetMoviesUseCase } from './application/use-cases/get-movies.usecase';
import { MovieRepositorySymbol } from './domain/ports/movie.repository.port';
import { MovieAdapter } from './infrastructure/adapters/movie.adapter';
import { JwtModule } from '@nestjs/jwt';
import { CreateMovieUseCase } from './application/use-cases/create-movie.usecase';
import { UpdateMovieUseCase } from './application/use-cases/update-movie.usecase';
import { DeleteMovieUseCase } from './application/use-cases/delete-movie.usecase';
import { SwapiServiceHttpConfig } from 'src/common/http-config/swapi-service-http-config';
import { SyncMovieUseCase } from './application/use-cases/sync-movie.usecase';
import { SwapiServiceSymbol } from './domain/ports/swapi.service.port';
import { SwapiAdapter } from './infrastructure/adapters/swapi.adapter';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    SwapiServiceHttpConfig.register(),
    JwtModule,
  ],
  controllers: [MovieController],
  providers: [
    GetMovieUseCase,
    GetMoviesUseCase,
    CreateMovieUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase,
    SyncMovieUseCase,
    {
      provide: MovieRepositorySymbol,
      useClass: MovieAdapter,
    },
    {
      provide: SwapiServiceSymbol,
      useClass: SwapiAdapter,
    },
  ],
})
export class MovieModule {}
