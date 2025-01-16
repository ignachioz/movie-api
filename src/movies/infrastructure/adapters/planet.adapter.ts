import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Character } from 'src/movies/domain/entities/character.entity';
import { PlanetRepository } from 'src/movies/domain/ports/planet.repository.port';
import { Planet } from 'src/movies/domain/entities/planet.entity';
export class PlanetAdapter implements PlanetRepository {
  constructor(
    @InjectRepository(Planet)
    private planetDBRepository: Repository<Planet>,
  ) {}

  async findByIds(ids: string[]): Promise<Array<Character>> {
    return await this.planetDBRepository.find({ where: { id: In(ids) } });
  }
}
