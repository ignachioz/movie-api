import { Inject } from '@nestjs/common';
import {
  MovieRepository,
  MovieRepositorySymbol,
} from 'src/movies/domain/ports/movie.repository.port';
import { MovieMapper } from '../mapper/movie.mapper';
import { MovieDto } from '../dto/movie.dto';

export class GetMoviesUseCase {
  constructor(
    @Inject(MovieRepositorySymbol)
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(): Promise<Array<MovieDto>> {
    const movies = await this.movieRepository.findAllMovies();
    return MovieMapper.moviesToDto(movies);
  }
}
