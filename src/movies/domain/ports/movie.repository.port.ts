import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  findAllMovies(): Promise<Array<Movie>>;
  findMovie(name: string): Promise<Movie>;
}

export const MovieRepositorySymbol = Symbol('MovieRepository');
