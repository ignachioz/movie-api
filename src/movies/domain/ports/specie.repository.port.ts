import { Specie } from '../entities/specie.entity';

export interface SpecieRepository {
  findByIds(ids: string[]): Promise<Array<Specie>>;
}

export const SpecieRepositorySymbol = Symbol('SpecieRepository');
