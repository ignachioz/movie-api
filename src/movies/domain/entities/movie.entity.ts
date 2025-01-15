import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './character.entity';
import { Planet } from './planet.entity';
import { Specie } from './specie.entity';
import { Starship } from './starship.entity';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'movie' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToMany(() => Character)
  @JoinTable({
    name: 'movie_character',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'character_id',
      referencedColumnName: 'id',
    },
  })
  characters: string[];
  @Column()
  created: string;
  @Column()
  director: string;
  @Column()
  edited: string;
  @Column()
  episodeId: string;
  @Column()
  openingCrawl: string;
  @ManyToMany(() => Planet)
  @JoinTable({
    name: 'movie_planet',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
  })
  planets: string[];
  @Column()
  producer: string;
  @Column()
  releaseDate: string;
  @ManyToMany(() => Specie)
  @JoinTable({
    name: 'movie_specie',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
  })
  species: string[];
  @ManyToMany(() => Starship)
  @JoinTable({
    name: 'movie_starship',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
  })
  starships: string[];
  @Column()
  title: string;
  @Column()
  url: string;
  @ManyToMany(() => Vehicle)
  @JoinTable({
    name: 'movie_vehicle',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
  })
  vehicles: string[];
}
