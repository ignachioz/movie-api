import { Movie } from 'src/movies/domain/entities/movie.entity';
import { MovieDto } from '../dto/movie.dto';
import { StatusOkDto } from '../dto/status-ok.dto';

export class MovieMapper {
  public static moviesToDto(movies: Array<Movie>): Array<MovieDto> {
    return movies.map((movie) => this.movieToDto(movie));
  }

  public static movieToDto(movie: Movie): MovieDto {
    return new MovieDto(
      movie._id,
      movie.characters,
      movie.created,
      movie.director,
      movie.edited,
      movie.episodeId,
      movie.openingCrawl,
      movie.planets,
      movie.producer,
      movie.releaseDate,
      movie.species,
      movie.starships,
      movie.title,
      movie.url,
      movie.vehicles,
    );
  }

  public static statusOKToDto(message: string): StatusOkDto {
    return new StatusOkDto(message);
  }
}
