import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CharacterRepository } from 'src/movies/domain/ports/character.repository.port';
import { Character } from 'src/movies/domain/entities/character.entity';
export class CharacterAdapter implements CharacterRepository {
  constructor(
    @InjectRepository(Character)
    private characterDBRepository: Repository<Character>,
  ) {}

  async findByIds(ids: string[]): Promise<Array<Character>> {
    return await this.characterDBRepository.find({ where: { id: In(ids) } });
  }
}
