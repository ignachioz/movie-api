import { Specie } from '../../domain/entities/specie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Character } from 'src/movies/domain/entities/character.entity';
import { SpecieRepository } from 'src/movies/domain/ports/specie.repository.port';
export class SpecieAdapter implements SpecieRepository {
  constructor(
    @InjectRepository(Specie)
    private specieDBRepository: Repository<Specie>,
  ) {}

  async findByIds(ids: string[]): Promise<Array<Character>> {
    return await this.specieDBRepository.find({ where: { id: In(ids) } });
  }
}
