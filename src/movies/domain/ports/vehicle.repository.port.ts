import { Vehicle } from '../entities/vehicle.entity';

export interface VehicleRepository {
  findByIds(ids: string[]): Promise<Array<Vehicle>>;
}

export const VehicleRepositorySymbol = Symbol('VehicleRepository');
