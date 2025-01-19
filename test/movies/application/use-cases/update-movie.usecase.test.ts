import {
  MovieRepository,
  MovieRepositorySymbol,
} from './../../../../src/movies/domain/ports/movie.repository.port';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { MovieAdapter } from 'src/movies/infrastructure/adapters/movie.adapter';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import { ConflictException } from '@nestjs/common';
import { UpdateMovieDto } from 'src/movies/domain/dto/update-movie.dto';
import { UpdateMovieUseCase } from 'src/movies/application/use-cases/update-movie.usecase';

describe('Create movie usecase', () => {
  let repository: MovieRepository;
  let updateMovieUseCase: UpdateMovieUseCase;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        UpdateMovieUseCase,
        {
          provide: MovieRepositorySymbol,
          useValue: createMock<MovieAdapter>(),
        },
      ],
    }).compile();
    repository = moduleRef.get<MovieRepository>(MovieRepositorySymbol);
    updateMovieUseCase = moduleRef.get<UpdateMovieUseCase>(UpdateMovieUseCase);
  });

  it('execute OK', async () => {
    let movieUpdated = new UpdateMovieDto();
    movieUpdated.characters = ['test'];
    movieUpdated.vehicles = ['test'];
    movieUpdated.created = '2025-05-05';
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
    jest.spyOn(repository, 'updateMovie').mockResolvedValue(movieBD as Movie);
    const response = await updateMovieUseCase.execute(
      'abc-123-123-123-128',
      movieUpdated,
    );
    expect(response).toMatchObject({
      message: 'MOVIE A new hope UPDATE SUCCESSFULL',
      status: 'OK',
    });
  });

  it('execute error: Update title already exist', async () => {
    let idMovie = 'abc-123-123-123-128';
    let movieUpdated = new UpdateMovieDto();
    movieUpdated.characters = ['test'];
    movieUpdated.title = 'A new hope';
    movieUpdated.vehicles = ['test'];
    movieUpdated.created = '2025-05-05';
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
    try {
      await updateMovieUseCase.execute(idMovie, movieUpdated);
    } catch (e) {
      expect(e).toBeInstanceOf(ConflictException);
    }
  });
});
