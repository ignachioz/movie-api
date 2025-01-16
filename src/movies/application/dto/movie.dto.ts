import { CharacterDto } from './character.dto';
import { PlanetDto } from './planet.dto';
import { SpecieDto } from './specie.dto';
import { StarshipDto } from './starship.dto';
import { VehicleDto } from './vehicle.dto';

export class MovieDto {
  constructor(
    public id: string,
    public characters: CharacterDto[],
    public created: string,
    public director: string,
    public edited: string,
    public episodeId: string,
    public openingCrawl: string,
    public planets: PlanetDto[],
    public producer: string,
    public releaseDate: string,
    public species: SpecieDto[],
    public starships: StarshipDto[],
    public title: string,
    public url: string,
    public vehicles: VehicleDto[],
  ) {}
}
