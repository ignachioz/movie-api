import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  findAllMovies(): Promise<Array<Movie>>;
  findMovieByField(field: string, value: string): Promise<Movie>;
  saveMovie(movie: CreateMovieDto): Promise<Movie>;
  deleteMovie(id: string): Promise<void>;
  updateMovie(movieUpdate: UpdateMovieDto, id: string): Promise<Movie>;
}

export const MovieRepositorySymbol = Symbol('MovieRepository');
