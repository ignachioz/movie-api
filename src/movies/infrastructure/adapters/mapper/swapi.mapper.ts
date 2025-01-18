import { MovieDomainDto } from 'src/movies/domain/dto/movie-domain.dto';
import { SwapiResponseDto } from '../dto/swapi-response.dto';

export class SwapiMapper {
  public static SwapiResponseToMovieDomainDto(
    body: SwapiResponseDto,
  ): MovieDomainDto {
    return {
      characters: body.characters,
      created: body.created,
      director: body.director,
      edited: body.edited,
      episodeId: body.episode_id,
      openingCrawl: body.opening_crawl,
      planets: body.planets,
      producer: body.producer,
      releaseDate: body.release_date,
      species: body.species,
      starships: body.starships,
      title: body.title,
      url: body.url,
      vehicles: body.vehicles,
    };
  }
}
