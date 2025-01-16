import { ConflictException, Inject } from '@nestjs/common';
import {
  MovieRepository,
  MovieRepositorySymbol,
} from 'src/movies/domain/ports/movie.repository.port';
import { MovieMapper } from '../mapper/movie.mapper';
import { StatusOkDto } from '../dto/status-ok.dto';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import {
  CharacterRepository,
  CharacterRepositorySymbol,
} from 'src/movies/domain/ports/character.repository.port';
import {
  StarshipRepository,
  StarshipRepositorySymbol,
} from 'src/movies/domain/ports/starship.repository.port';
import {
  VehicleRepository,
  VehicleRepositorySymbol,
} from 'src/movies/domain/ports/vehicle.repository.port';
import {
  PlanetRepository,
  PlanetRepositorySymbol,
} from 'src/movies/domain/ports/planet.repository.port';
import {
  SpecieRepository,
  SpecieRepositorySymbol,
} from 'src/movies/domain/ports/specie.repository.port';

export class UpdateMovieUseCase {
  constructor(
    @Inject(MovieRepositorySymbol)
    private readonly movieRepository: MovieRepository,
    @Inject(CharacterRepositorySymbol)
    private readonly characterRepository: CharacterRepository,
    @Inject(PlanetRepositorySymbol)
    private readonly planetRepository: PlanetRepository,
    @Inject(SpecieRepositorySymbol)
    private readonly specieRepository: SpecieRepository,
    @Inject(StarshipRepositorySymbol)
    private readonly starshipRepository: StarshipRepository,
    @Inject(VehicleRepositorySymbol)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(id: string, movie: Movie): Promise<StatusOkDto> {
    const movieExist = await this.movieRepository.findMovieByField('id', id);
    if (!movieExist) throw new ConflictException("MOVIE DOESN'T EXIST");
    Object.assign(movieExist, movie);
    if (movie.characters) {
      movieExist.characters = await this.characterRepository.findByIds(
        movie.characters.map((character) => character.id),
      );
    }
    if (movie.planets) {
      movieExist.planets = await this.planetRepository.findByIds(
        movie.planets.map((planet) => planet.id),
      );
    }
    if (movieExist.species) {
      movieExist.species = await this.specieRepository.findByIds(
        movie.species.map((specie) => specie.id),
      );
    }
    if (movie.starships) {
      movieExist.starships = await this.starshipRepository.findByIds(
        movie.starships.map((startship) => startship.id),
      );
    }
    if (movie.vehicles) {
      movieExist.vehicles = await this.vehicleRepository.findByIds(
        movie.vehicles.map((vehicle) => vehicle.id),
      );
    }
    await this.movieRepository.saveMovie(movieExist);
    return MovieMapper.statusOKToDto(
      `MOVIE ${movieExist.title} UPDATE SUCCESSFULL`,
    );
  }
}
