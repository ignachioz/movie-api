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
    if (body.title) {
      let movieInBD = await this.movieRepository.findMovieByField(
        'title',
        body.title,
      );
      if (movieInBD._id !== id)
        throw new ConflictException(`MOVIE TITLE: ${body.title} ALREADY EXIST`);
    }
    let movieUpdated = await this.movieRepository.updateMovie(body, id);
    return MovieMapper.statusOKToDto(
      `MOVIE ${movieUpdated.title} UPDATE SUCCESSFULL`,
    );
  }
}
