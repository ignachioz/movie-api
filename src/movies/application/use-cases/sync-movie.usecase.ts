import { ConflictException, Inject } from '@nestjs/common';
import {
  MovieRepository,
  MovieRepositorySymbol,
} from 'src/movies/domain/ports/movie.repository.port';
import { MovieMapper } from '../mapper/movie.mapper';
import { StatusOkDto } from '../dto/status-ok.dto';
import {
  SwapiService,
  SwapiServiceSymbol,
} from 'src/movies/domain/ports/swapi.service.port';
import { CreateMovieDto } from 'src/movies/domain/dto/create-movie.dto';

export class SyncMovieUseCase {
  constructor(
    @Inject(MovieRepositorySymbol)
    private readonly movieRepository: MovieRepository,
    @Inject(SwapiServiceSymbol)
    private readonly swapiService: SwapiService,
  ) {}

  async execute(): Promise<StatusOkDto> {
    const moviesSwapi = await this.swapiService.findAllMovies();
    for (let movieSwapi of moviesSwapi) {
      const movieExistInDB = await this.movieRepository.findMovieByField(
        'title',
        movieSwapi.title,
      );
      if (movieExistInDB) continue;
      const movieCreate = new CreateMovieDto();
      movieCreate.characters = movieSwapi.characters;
      movieCreate.planets = movieSwapi.planets;
      movieCreate.species = movieSwapi.species;
      movieCreate.starships = movieSwapi.starships;
      movieCreate.vehicles = movieSwapi.vehicles;
      movieCreate.created = movieSwapi.created;
      movieCreate.director = movieSwapi.director;
      movieCreate.edited = movieSwapi.edited;
      movieCreate.episodeId = movieSwapi.episodeId;
      movieCreate.openingCrawl = movieSwapi.openingCrawl;
      movieCreate.producer = movieSwapi.producer;
      movieCreate.releaseDate = movieSwapi.releaseDate;
      movieCreate.title = movieSwapi.title;
      movieCreate.url = movieSwapi.url;
      await this.movieRepository.saveMovie(movieCreate);
    }
    return MovieMapper.statusOKToDto(`SYNC MOVIES OK`);
  }
}
