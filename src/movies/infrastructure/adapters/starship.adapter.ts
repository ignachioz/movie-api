import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CharacterRepository } from 'src/movies/domain/ports/character.repository.port';
import { Character } from 'src/movies/domain/entities/character.entity';
import { StarshipRepository } from 'src/movies/domain/ports/starship.repository.port';
import { Starship } from 'src/movies/domain/entities/starship.entity';
export class StarshipAdapter implements StarshipRepository {
  constructor(
    @InjectRepository(Starship)
    private starshipDBRepository: Repository<Starship>,
  ) {}

  async findByIds(ids: string[]): Promise<Array<Character>> {
    return await this.starshipDBRepository.find({ where: { id: In(ids) } });
  }
}
