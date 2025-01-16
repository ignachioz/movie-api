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

  async execute(title: string): Promise<MovieDto> {
    const movie = await this.movieRepository.findMovie(title);
    return MovieMapper.movieToDto(movie);
  }
}
