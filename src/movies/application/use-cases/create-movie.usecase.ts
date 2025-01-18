import { ConflictException, Inject } from '@nestjs/common';
import {
  MovieRepository,
  MovieRepositorySymbol,
} from 'src/movies/domain/ports/movie.repository.port';
import { MovieMapper } from '../mapper/movie.mapper';
import { StatusOkDto } from '../dto/status-ok.dto';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import { CreateMovieDto } from 'src/movies/domain/dto/create-movie.dto';

export class CreateMovieUseCase {
  constructor(
    @Inject(MovieRepositorySymbol)
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(movie: CreateMovieDto): Promise<StatusOkDto> {
    const movieExist = await this.movieRepository.findMovieByField(
      'title',
      movie.title,
    );
    if (movieExist) throw new ConflictException('MOVIE EXIST');
    await this.movieRepository.saveMovie(movie);
    return MovieMapper.statusOKToDto(
      `MOVIE ${movie.title} CREATED SUCCESSFULL`,
    );
  }
}
