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

export class CreateMovieUseCase {
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

  async execute(movie: Movie): Promise<StatusOkDto> {
    console.log('MOVIE PRODUCER: ', movie.title);
    const movieExist = await this.movieRepository.findMovieByField(
      'title',
      movie.title,
    );
    console.log('MOVIE EXIST: ', movieExist);
    if (movieExist) throw new ConflictException('MOVIE EXIST');
    movie.created = movie.created;
    movie.director = movie.director;
    movie.edited = movie.edited;
    movie.episodeId = movie.episodeId;
    movie.openingCrawl = movie.openingCrawl;
    movie.producer = movie.producer;
    movie.releaseDate = movie.releaseDate;
    movie.title = movie.title;
    movie.url = movie.url;
    movie.characters = await this.characterRepository.findByIds(
      movie.characters.map((character) => character.id),
    );
    movie.planets = await this.planetRepository.findByIds(
      movie.planets.map((planet) => planet.id),
    );
    movie.species = await this.specieRepository.findByIds(
      movie.species.map((specie) => specie.id),
    );
    movie.starships = await this.starshipRepository.findByIds(
      movie.starships.map((startship) => startship.id),
    );
    movie.vehicles = await this.vehicleRepository.findByIds(
      movie.vehicles.map((vehicle) => vehicle.id),
    );
    await this.movieRepository.saveMovie(movie);
    return MovieMapper.statusOKToDto(
      `MOVIE ${movie.title} CREATED SUCCESSFULL`,
    );
  }
}
