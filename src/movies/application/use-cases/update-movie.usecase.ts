import { ConflictException, Inject } from '@nestjs/common';
import {
  MovieRepository,
  MovieRepositorySymbol,
} from 'src/movies/domain/ports/movie.repository.port';
import { MovieMapper } from '../mapper/movie.mapper';
import { StatusOkDto } from '../dto/status-ok.dto';
import { UpdateMovieDto } from 'src/movies/domain/dto/update-movie.dto';

export class UpdateMovieUseCase {
  constructor(
    @Inject(MovieRepositorySymbol)
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(id: string, body: UpdateMovieDto): Promise<StatusOkDto> {
    await this.movieRepository.updateMovie(body, id);
    return MovieMapper.statusOKToDto(`MOVIE ${body.title} UPDATE SUCCESSFULL`);
  }
}
