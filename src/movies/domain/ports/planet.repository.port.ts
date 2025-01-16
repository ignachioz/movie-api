import { Planet } from '../entities/planet.entity';

export interface PlanetRepository {
  findByIds(ids: string[]): Promise<Array<Planet>>;
}

export const PlanetRepositorySymbol = Symbol('PlanetRepository');
