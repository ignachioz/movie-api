import { Movie } from 'src/movies/domain/entities/movie.entity';
import { MovieDto } from '../dto/movie.dto';
import { Character } from 'src/movies/domain/entities/character.entity';
import { Planet } from 'src/movies/domain/entities/planet.entity';
import { Specie } from 'src/movies/domain/entities/specie.entity';
import { Starship } from 'src/movies/domain/entities/starship.entity';
import { Vehicle } from 'src/movies/domain/entities/vehicle.entity';
import { CharacterDto } from '../dto/character.dto';
import { PlanetDto } from '../dto/planet.dto';
import { SpecieDto } from '../dto/specie.dto';
import { StarshipDto } from '../dto/starship.dto';
import { VehicleDto } from '../dto/vehicle.dto';

export class MovieMapper {
  public static moviesToDto(movies: Array<Movie>): Array<MovieDto> {
    console.log('MOVIES DTO: ' + JSON.stringify(movies));
    const response = movies.map((movie) => this.movieToDto(movie));
    console.log('{RESPOSNE;: ' + JSON.stringify(response));
    return response;
  }

  public static movieToDto(movie: Movie): MovieDto {
    console.log('MOVIEEEE: ' + JSON.stringify(movie));
    return new MovieDto(
      movie.id,
      movie.characters
        ? movie.characters.map((character) => this.characterToDto(character))
        : [],
      movie.created,
      movie.director,
      movie.edited,
      movie.episodeId,
      movie.openingCrawl,
      movie.planets
        ? movie.planets.map((planet) => this.planetToDto(planet))
        : [],
      movie.producer,
      movie.releaseDate,
      movie.species
        ? movie.species.map((specie) => this.specieToDto(specie))
        : [],
      movie.starships
        ? movie.starships.map((starship) => this.starshipToDto(starship))
        : [],
      movie.title,
      movie.url,
      movie.vehicles
        ? movie.vehicles.map((vehicle) => this.vehicleToDto(vehicle))
        : [],
    );
  }

  private static characterToDto(character: Character): CharacterDto {
    return new CharacterDto(character.id, character.url);
  }

  private static planetToDto(planet: Planet): PlanetDto {
    return new PlanetDto(planet.id, planet.url);
  }

  private static specieToDto(specie: Specie): SpecieDto {
    return new SpecieDto(specie.id, specie.url);
  }

  private static starshipToDto(starship: Starship): StarshipDto {
    return new StarshipDto(starship.id, starship.url);
  }

  private static vehicleToDto(vehicle: Vehicle): VehicleDto {
    return new StarshipDto(vehicle.id, vehicle.url);
  }
}
