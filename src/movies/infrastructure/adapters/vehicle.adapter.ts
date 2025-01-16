import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Character } from 'src/movies/domain/entities/character.entity';
import { VehicleRepository } from 'src/movies/domain/ports/vehicle.repository.port';
import { Vehicle } from 'src/movies/domain/entities/vehicle.entity';
export class VehicleAdapter implements VehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleDBRepository: Repository<Vehicle>,
  ) {}

  async findByIds(ids: string[]): Promise<Array<Character>> {
    return await this.vehicleDBRepository.find({ where: { id: In(ids) } });
  }
}
