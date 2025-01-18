import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  characters: string[];
  @ApiProperty()
  created: string;
  @ApiProperty()
  director: string;
  @ApiProperty()
  edited: string;
  @ApiProperty()
  episodeId: number;
  @ApiProperty()
  openingCrawl: string;
  @ApiProperty()
  planets: string[];
  @ApiProperty()
  producer: string;
  @ApiProperty()
  releaseDate: string;
  @ApiProperty()
  species: string[];
  @ApiProperty()
  starships: string[];
  @ApiProperty()
  title: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  vehicles: string[];
  constructor(
    id: string,
    characters: string[],
    created: string,
    director: string,
    edited: string,
    episodeId: number,
    openingCrawl: string,
    planets: string[],
    producer: string,
    releaseDate: string,
    species: string[],
    starships: string[],
    title: string,
    url: string,
    vehicles: string[],
  ) {
    this.id = id;
    this.characters = characters;
    this.created = created;
    this.director = director;
    this.edited = edited;
    this.episodeId = episodeId;
    this.openingCrawl = openingCrawl;
    this.planets = planets;
    this.producer = producer;
    this.releaseDate = releaseDate;
    this.species = species;
    this.starships = starships;
    this.title = title;
    this.url = url;
    this.vehicles = vehicles;
  }
}
