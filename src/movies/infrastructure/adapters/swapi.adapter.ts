import { MovieDomainDto } from 'src/movies/domain/dto/movie-domain.dto';
import { SwapiService } from './../../domain/ports/swapi.service.port';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { SwapiResponseDto } from './dto/swapi-response.dto';
import { SwapiMapper } from './mapper/swapi.mapper';
import { SwapiResultDto } from './dto/swapi-result.dto';

@Injectable()
export class SwapiAdapter implements SwapiService {
  constructor(private readonly httpService: HttpService) {}

  async findAllMovies(): Promise<Array<MovieDomainDto>> {
    return await lastValueFrom(
      this.httpService.get<SwapiResultDto>('/films/'),
    ).then((response) =>
      response.data.results.map((movie) =>
        SwapiMapper.SwapiResponseToMovieDomainDto(movie),
      ),
    );
  }
}
