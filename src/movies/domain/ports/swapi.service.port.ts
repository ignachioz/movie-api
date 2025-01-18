import { MovieDomainDto } from '../dto/movie-domain.dto';

export interface SwapiService {
  findAllMovies(): Promise<Array<MovieDomainDto>>;
}

export const SwapiServiceSymbol = Symbol('SwapiService');
