import { Movie } from 'src/movies/domain/entities/movie.entity';
import { Character } from 'src/movies/domain/entities/character.entity';
import { Planet } from 'src/movies/domain/entities/planet.entity';
import { Specie } from 'src/movies/domain/entities/specie.entity';
import { Starship } from 'src/movies/domain/entities/starship.entity';
import { Vehicle } from 'src/movies/domain/entities/vehicle.entity';
import { MovieRequestDto } from '../dto/movie-request.dto';
import { UpdateMovieRequestDto } from '../dto/update-movie-request.dto';

export class MovieMapper {
  public static movieToDomain(movie: MovieRequestDto): Movie {
    const movieDomain = new Movie();
    movieDomain.characters = movie.characters.map((character) =>
      this.characterToDomain(character),
    );
    movieDomain.created = movie.created;
    movieDomain.director = movie.director;
    movieDomain.edited = movie.edited;
    movieDomain.episodeId = movie.episodeId.toString();
    movieDomain.openingCrawl = movie.openingCrawl;
    movieDomain.planets = movie.planets.map((planet) =>
      this.planetToDomain(planet),
    );
    movieDomain.producer = movie.producer;
    movieDomain.releaseDate = movie.releaseDate;
    movieDomain.species = movie.species.map((specie) =>
      this.specieToDomain(specie),
    );
    movieDomain.starships = movie.starships.map((starship) =>
      this.starshipToDomain(starship),
    );
    movieDomain.title = movie.title;
    movieDomain.url = movie.url;
    movieDomain.vehicles = movie.vehicles.map((vehicle) =>
      this.vehicleToDomain(vehicle),
    );
    return movieDomain;
  }

  private static characterToDomain(character: string): Character {
    return {
      id: character,
      url: '',
    };
  }

  private static planetToDomain(planet: string): Planet {
    return {
      id: planet,
      url: '',
    };
  }

  private static specieToDomain(specie: string): Specie {
    return {
      id: specie,
      url: '',
    };
  }

  private static starshipToDomain(starship: string): Starship {
    return {
      id: starship,
      url: '',
    };
  }

  private static vehicleToDomain(vehicle: string): Vehicle {
    return {
      id: vehicle,
      url: '',
    };
  }

  public static updateMovieToDomain(movie: UpdateMovieRequestDto): Movie {
    const movieDomain = new Movie();
    movieDomain.characters = movie.characters?.map((character) =>
      this.characterToDomain(character),
    );
    movieDomain.created = movie.created;
    movieDomain.director = movie.director;
    movieDomain.edited = movie.edited;
    movieDomain.episodeId = movie.episodeId?.toString();
    movieDomain.openingCrawl = movie.openingCrawl;
    movieDomain.planets = movie.planets?.map((planet) =>
      this.planetToDomain(planet),
    );
    movieDomain.producer = movie.producer;
    movieDomain.releaseDate = movie.releaseDate;
    movieDomain.species = movie.species?.map((specie) =>
      this.specieToDomain(specie),
    );
    movieDomain.starships = movie.starships?.map((starship) =>
      this.starshipToDomain(starship),
    );
    movieDomain.title = movie.title;
    movieDomain.url = movie.url;
    movieDomain.vehicles = movie.vehicles?.map((vehicle) =>
      this.vehicleToDomain(vehicle),
    );
    return movieDomain;
  }
}
