import { Inject } from '@nestjs/common';
import {
  MovieRepository,
  MovieRepositorySymbol,
} from 'src/movies/domain/ports/movie.repository.port';
import { MovieMapper } from '../mapper/movie.mapper';
import { StatusOkDto } from '../dto/status-ok.dto';

export class DeleteMovieUseCase {
  constructor(
    @Inject(MovieRepositorySymbol)
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(id: string): Promise<StatusOkDto> {
    await this.movieRepository.deleteMovie(id);
    return MovieMapper.statusOKToDto(`MOVIE: ${id} DELETE SUCCESSFULL`);
  }
}
