import {
  MovieRepository,
  MovieRepositorySymbol,
} from '../../../../src/movies/domain/ports/movie.repository.port';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { MovieAdapter } from 'src/movies/infrastructure/adapters/movie.adapter';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import { NotFoundException } from '@nestjs/common';
import { GetMovieUseCase } from 'src/movies/application/use-cases/get-movie.usecase';

describe('Get movie usecase', () => {
  let repository: MovieRepository;
  let getMovieUseCase: GetMovieUseCase;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        GetMovieUseCase,
        {
          provide: MovieRepositorySymbol,
          useValue: createMock<MovieAdapter>(),
        },
      ],
    }).compile();
    repository = moduleRef.get<MovieRepository>(MovieRepositorySymbol);
    getMovieUseCase = moduleRef.get<GetMovieUseCase>(GetMovieUseCase);
  });

  it('execute OK', async () => {
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
    let expected = {
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
    const response = await getMovieUseCase.execute('abc-123-01231-5468');
    expect(response).toMatchObject(expected);
  });

  it('execute error: Movie exist', async () => {
    jest.spyOn(repository, 'findMovieByField').mockResolvedValue(null);
    try {
      await getMovieUseCase.execute('abc-123-01231-5468');
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });
});
