import {
  MovieRepository,
  MovieRepositorySymbol,
} from '../../../../src/movies/domain/ports/movie.repository.port';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { CreateMovieUseCase } from 'src/movies/application/use-cases/create-movie.usecase';
import { MovieAdapter } from 'src/movies/infrastructure/adapters/movie.adapter';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import { CreateMovieDto } from 'src/movies/domain/dto/create-movie.dto';
import { ConflictException } from '@nestjs/common';
import { UpdateMovieDto } from 'src/movies/domain/dto/update-movie.dto';
import { UpdateMovieUseCase } from 'src/movies/application/use-cases/update-movie.usecase';
import { SyncMovieUseCase } from 'src/movies/application/use-cases/sync-movie.usecase';
import {
  SwapiService,
  SwapiServiceSymbol,
} from 'src/movies/domain/ports/swapi.service.port';
import { SwapiAdapter } from 'src/movies/infrastructure/adapters/swapi.adapter';
import { MovieDomainDto } from 'src/movies/domain/dto/movie-domain.dto';

describe('Sync movie usecase', () => {
  let repository: MovieRepository;
  let service: SwapiService;
  let syncMovieUseCase: SyncMovieUseCase;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        SyncMovieUseCase,
        {
          provide: MovieRepositorySymbol,
          useValue: createMock<MovieAdapter>(),
        },
        {
          provide: SwapiServiceSymbol,
          useValue: createMock<SwapiAdapter>(),
        },
      ],
    }).compile();
    repository = moduleRef.get<MovieRepository>(MovieRepositorySymbol);
    syncMovieUseCase = moduleRef.get<SyncMovieUseCase>(SyncMovieUseCase);
    service = moduleRef.get<SwapiService>(SwapiServiceSymbol);
  });

  it('execute OK', async () => {
    let movieDomainDto = new MovieDomainDto();
    movieDomainDto.characters = [];
    movieDomainDto.created = '2025-04-25';
    movieDomainDto.director = 'test';
    movieDomainDto.edited = 'test';
    movieDomainDto.episodeId = 4;
    movieDomainDto.openingCrawl = 'test';
    movieDomainDto.planets = [];
    movieDomainDto.producer = 'test';
    movieDomainDto.releaseDate = '2025-05-25';
    movieDomainDto.species = [];
    movieDomainDto.starships = [];
    movieDomainDto.title = 'test';
    movieDomainDto.url = 'test';
    movieDomainDto.vehicles = [];
    let movieBD = {
      _id: 'abc123',
      characters: ['test'],
      created: '2025-05-05',
      director: 'test',
      edited: 'George',
      openingCrawl: 'test',
      planets: ['test'],
      producer: 'George',
      releaseDate: '2025-05-05',
      species: ['test'],
      starships: ['test'],
      title: 'A new hope',
      url: 'testurl',
      vehicles: ['test'],
    };
    jest.spyOn(repository, 'findMovieByField').mockResolvedValue(null);
    jest
      .spyOn(service, 'findAllMovies')
      .mockImplementation(() => Promise.resolve([movieDomainDto]));
    jest.spyOn(repository, 'saveMovie').mockResolvedValue(movieBD as Movie);
    const response = await syncMovieUseCase.execute();
    expect(response).toMatchObject({
      message: 'SYNC MOVIES OK',
      status: 'OK',
    });
    expect(repository.saveMovie).toHaveBeenCalled();
  });

  it('execute OK: Dont update movies', async () => {
    let movieDomainDto = new MovieDomainDto();
    movieDomainDto.characters = [];
    movieDomainDto.created = '2025-04-25';
    movieDomainDto.director = 'test';
    movieDomainDto.edited = 'test';
    movieDomainDto.episodeId = 4;
    movieDomainDto.openingCrawl = 'test';
    movieDomainDto.planets = [];
    movieDomainDto.producer = 'test';
    movieDomainDto.releaseDate = '2025-05-25';
    movieDomainDto.species = [];
    movieDomainDto.starships = [];
    movieDomainDto.title = 'test';
    movieDomainDto.url = 'test';
    movieDomainDto.vehicles = [];

    let movieBD = {
      _id: 'abc123',
      characters: ['test'],
      created: '2025-05-05',
      director: 'test',
      edited: 'George',
      openingCrawl: 'test',
      planets: ['test'],
      producer: 'George',
      releaseDate: '2025-05-05',
      species: ['test'],
      starships: ['test'],
      title: 'A new hope',
      url: 'testurl',
      vehicles: ['test'],
    };
    jest
      .spyOn(repository, 'findMovieByField')
      .mockResolvedValue(movieBD as Movie);
    jest
      .spyOn(service, 'findAllMovies')
      .mockImplementation(() => Promise.resolve([movieDomainDto]));
    const response = await syncMovieUseCase.execute();
    expect(response).toMatchObject({
      message: 'SYNC MOVIES OK',
      status: 'OK',
    });
    expect(repository.saveMovie).not.toHaveBeenCalled();
  });
});
