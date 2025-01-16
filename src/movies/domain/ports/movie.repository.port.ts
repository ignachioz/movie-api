import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  findAllMovies(): Promise<Array<Movie>>;
}

export const MovieRepositorySymbol = Symbol('MovieRepository');
