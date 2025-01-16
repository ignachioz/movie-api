import { Module } from '@nestjs/common';
import { Movie } from './domain/entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './infrastructure/movie.controller';
import { GetMovieUseCase } from './application/use-cases/get-movie.usecase';
import { GetMoviesUseCase } from './application/use-cases/get-movies.usecase';
import { MovieRepositorySymbol } from './domain/ports/movie.repository.port';
import { MovieAdapter } from './infrastructure/adapters/movie.adapter';
import { JwtModule } from '@nestjs/jwt';
import { CharacterRepositorySymbol } from './domain/ports/character.repository.port';
import { CharacterAdapter } from './infrastructure/adapters/character.adapter';
import { PlanetRepositorySymbol } from './domain/ports/planet.repository.port';
import { PlanetAdapter } from './infrastructure/adapters/planet.adapter';
import { SpecieRepositorySymbol } from './domain/ports/specie.repository.port';
import { SpecieAdapter } from './infrastructure/adapters/specie.adapter';
import { StarshipRepositorySymbol } from './domain/ports/starship.repository.port';
import { StarshipAdapter } from './infrastructure/adapters/starship.adapter';
import { VehicleRepositorySymbol } from './domain/ports/vehicle.repository.port';
import { VehicleAdapter } from './infrastructure/adapters/vehicle.adapter';
import { CreateMovieUseCase } from './application/use-cases/create-movie.usecase';
import { Character } from './domain/entities/character.entity';
import { Specie } from './domain/entities/specie.entity';
import { Planet } from './domain/entities/planet.entity';
import { Starship } from './domain/entities/starship.entity';
import { Vehicle } from './domain/entities/vehicle.entity';
import { UpdateMovieUseCase } from './application/use-cases/update-movie.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      Character,
      Specie,
      Planet,
      Starship,
      Vehicle,
    ]),
    JwtModule,
  ],
  controllers: [MovieController],
  providers: [
    GetMovieUseCase,
    GetMoviesUseCase,
    CreateMovieUseCase,
    UpdateMovieUseCase,
    {
      provide: MovieRepositorySymbol,
      useClass: MovieAdapter,
    },
    {
      provide: CharacterRepositorySymbol,
      useClass: CharacterAdapter,
    },
    {
      provide: PlanetRepositorySymbol,
      useClass: PlanetAdapter,
    },
    {
      provide: SpecieRepositorySymbol,
      useClass: SpecieAdapter,
    },
    {
      provide: StarshipRepositorySymbol,
      useClass: StarshipAdapter,
    },
    {
      provide: VehicleRepositorySymbol,
      useClass: VehicleAdapter,
    },
  ],
})
export class MovieModule {}
