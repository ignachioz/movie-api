import { Character } from '../entities/character.entity';

export interface CharacterRepository {
  findByIds(ids: string[]): Promise<Array<Character>>;
}

export const CharacterRepositorySymbol = Symbol('CharacterRepository');
