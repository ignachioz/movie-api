import { Inject, NotFoundException } from '@nestjs/common';
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

  async execute(id: string): Promise<MovieDto> {
    const movie = await this.movieRepository.findMovieByField('_id', id);
    if (!movie) throw new NotFoundException(`DON'T EXIST MOVIE: ${id}`);
    return MovieMapper.movieToDto(movie);
  }
}
