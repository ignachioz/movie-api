import {
  MovieRepository,
  MovieRepositorySymbol,
} from './../../../../src/movies/domain/ports/movie.repository.port';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { CreateMovieUseCase } from 'src/movies/application/use-cases/create-movie.usecase';
import { MovieAdapter } from 'src/movies/infrastructure/adapters/movie.adapter';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import { CreateMovieDto } from 'src/movies/domain/dto/create-movie.dto';
import { ConflictException } from '@nestjs/common';

describe('Create movie usecase', () => {
  let repository: MovieRepository;
  let createMovieCase: CreateMovieUseCase;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        CreateMovieUseCase,
        {
          provide: MovieRepositorySymbol,
          useValue: createMock<MovieAdapter>(),
        },
      ],
    }).compile();
    repository = moduleRef.get<MovieRepository>(MovieRepositorySymbol);
    createMovieCase = moduleRef.get<CreateMovieUseCase>(CreateMovieUseCase);
  });

  it('execute OK', async () => {
    let movieCreated = new CreateMovieDto();
    movieCreated.characters = ['test'];
    movieCreated.vehicles = ['test'];
    movieCreated.starships = ['test'];
    movieCreated.planets = ['test'];
    movieCreated.species = ['test'];
    movieCreated.releaseDate = '2025-05-05';
    movieCreated.producer = 'George';
    movieCreated.title = 'A new hope';
    movieCreated.url = 'testurl';
    movieCreated.episodeId = 4;
    movieCreated.openingCrawl = 'test';
    movieCreated.edited = 'George';
    movieCreated.director = 'test';
    movieCreated.created = '2025-05-05';
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
    jest.spyOn(repository, 'saveMovie').mockResolvedValue(movieBD as Movie);
    const response = await createMovieCase.execute(movieCreated);
    expect(response).toMatchObject({
      message: 'MOVIE A new hope CREATED SUCCESSFULL',
      status: 'OK',
    });
  });

  it('execute error: Movie exist', async () => {
    let movieCreated = new CreateMovieDto();
    movieCreated.characters = ['test'];
    movieCreated.vehicles = ['test'];
    movieCreated.starships = ['test'];
    movieCreated.planets = ['test'];
    movieCreated.species = ['test'];
    movieCreated.releaseDate = '2025-05-05';
    movieCreated.producer = 'George';
    movieCreated.title = 'A new hope';
    movieCreated.url = 'testurl';
    movieCreated.episodeId = 4;
    movieCreated.openingCrawl = 'test';
    movieCreated.edited = 'George';
    movieCreated.director = 'test';
    movieCreated.created = '2025-05-05';
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
      await createMovieCase.execute(movieCreated);
    } catch (e) {
      expect(e).toBeInstanceOf(ConflictException);
    }
  });
});
