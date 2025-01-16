import { Starship } from '../entities/starship.entity';

export interface StarshipRepository {
  findByIds(ids: string[]): Promise<Array<Starship>>;
}

export const StarshipRepositorySymbol = Symbol('StarshipRepository');
