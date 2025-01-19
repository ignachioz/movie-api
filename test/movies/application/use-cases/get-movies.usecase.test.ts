import {
  MovieRepository,
  MovieRepositorySymbol,
} from '../../../../src/movies/domain/ports/movie.repository.port';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { MovieAdapter } from 'src/movies/infrastructure/adapters/movie.adapter';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import { GetMoviesUseCase } from 'src/movies/application/use-cases/get-movies.usecase';

describe('Get movies usecase', () => {
  let repository: MovieRepository;
  let getMoviesUseCase: GetMoviesUseCase;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        GetMoviesUseCase,
        {
          provide: MovieRepositorySymbol,
          useValue: createMock<MovieAdapter>(),
        },
      ],
    }).compile();
    repository = moduleRef.get<MovieRepository>(MovieRepositorySymbol);
    getMoviesUseCase = moduleRef.get<GetMoviesUseCase>(GetMoviesUseCase);
  });

  it('execute OK', async () => {
    let movieBD = [
      {
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
      },
    ];
    let expected = [
      {
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
      },
    ];
    jest
      .spyOn(repository, 'findAllMovies')
      .mockResolvedValue(movieBD as Movie[]);
    const response = await getMoviesUseCase.execute();
    expect(response).toMatchObject(expected);
  });
});
