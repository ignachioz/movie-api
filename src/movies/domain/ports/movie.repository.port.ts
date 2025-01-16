import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  findAllMovies(): Promise<Array<Movie>>;
  findMovieByField(field: string, value: string): Promise<Movie>;
  saveMovie(movie: Movie): Promise<Movie>;
}

export const MovieRepositorySymbol = Symbol('MovieRepository');
