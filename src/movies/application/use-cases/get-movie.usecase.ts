import { Inject } from '@nestjs/common';
import {
  MovieRepository,
  MovieRepositorySymbol,
} from 'src/movies/domain/ports/movie.repository.port';
import { MovieMapper } from '../mapper/movie.mapper';
import { MovieDto } from '../dto/movie.dto';

export class GetMovieUseCase {
  constructor(
    @Inject(MovieRepositorySymbol)
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(): Promise<Array<MovieDto>> {
    const movies = await this.movieRepository.findAllMovies();
    const data = MovieMapper.moviesToDto(movies);
    console.log('LA DATA: ' + JSON.stringify(data));
    return data;
  }
}
