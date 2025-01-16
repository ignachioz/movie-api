import { Movie } from 'src/movies/domain/entities/movie.entity';
import { MovieRepository } from './../../domain/ports/movie.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseException } from 'src/common/exceptions/database-exception.filter';
export class MovieAdapter implements MovieRepository {
  constructor(
    @InjectRepository(Movie) private movieDBRepository: Repository<Movie>,
  ) {}

  async saveMovie(movie: Movie): Promise<Movie> {
    try {
      return await this.movieDBRepository.save(movie);
    } catch (e) {
      throw new DatabaseException('SAVE MOVIE:' + e);
    }
  }

  async findAllMovies(): Promise<Array<Movie>> {
    try {
      return await this.movieDBRepository.find({
        relations: [
          'characters',
          'planets',
          'species',
          'starships',
          'vehicles',
        ],
      });
    } catch (e) {
      throw new DatabaseException('FIND ALL MOVIES:' + e);
    }
  }

  async findMovieByField(field: string, value: string): Promise<Movie> {
    try {
      return this.movieDBRepository.findOne({
        where: { [field]: value },
        relations: [
          'characters',
          'planets',
          'species',
          'starships',
          'vehicles',
        ],
      });
    } catch (e) {
      throw new DatabaseException(`FIND MOVIE BY: ${field} - (${value}):` + e);
    }
  }
}
