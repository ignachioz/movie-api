import { Test } from '@nestjs/testing';
import { MovieDto } from 'src/movies/application/dto/movie.dto';
import { StatusOkDto } from 'src/movies/application/dto/status-ok.dto';
import { CreateMovieUseCase } from 'src/movies/application/use-cases/create-movie.usecase';
import { DeleteMovieUseCase } from 'src/movies/application/use-cases/delete-movie.usecase';
import { GetMovieUseCase } from 'src/movies/application/use-cases/get-movie.usecase';
import { GetMoviesUseCase } from 'src/movies/application/use-cases/get-movies.usecase';
import { SyncMovieUseCase } from 'src/movies/application/use-cases/sync-movie.usecase';
import { UpdateMovieUseCase } from 'src/movies/application/use-cases/update-movie.usecase';
import { CreateMovieDto } from 'src/movies/domain/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/domain/dto/update-movie.dto';
import { MovieController } from 'src/movies/infrastructure/movie.controller';
describe('MovieController', () => {
  let controller: MovieController;
  let createMovieUseCase: CreateMovieUseCase;
  let deleteMovieUseCase: DeleteMovieUseCase;
  let getMovieUseCase: GetMovieUseCase;
  let getMoviesUseCase: GetMoviesUseCase;
  let syncMoviesUseCase: SyncMovieUseCase;
  let updateMovieUseCase: UpdateMovieUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: CreateMovieUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteMovieUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetMovieUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetMoviesUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: SyncMovieUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateMovieUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<MovieController>(MovieController);
    createMovieUseCase = module.get<CreateMovieUseCase>(CreateMovieUseCase);
    deleteMovieUseCase = module.get<DeleteMovieUseCase>(DeleteMovieUseCase);
    getMovieUseCase = module.get<GetMovieUseCase>(GetMovieUseCase);
    getMoviesUseCase = module.get<GetMoviesUseCase>(GetMoviesUseCase);
    syncMoviesUseCase = module.get<SyncMovieUseCase>(SyncMovieUseCase);
    updateMovieUseCase = module.get<UpdateMovieUseCase>(UpdateMovieUseCase);
  });

  it('Get all movies success', async () => {
    let movies = new MovieDto(
      'abc123',
      [],
      '2020-05-05',
      'George',
      'test',
      4,
      'test',
      [],
      '',
      '2025-05-05',
      [],
      [],
      'test',
      'test',
      [],
    );
    jest
      .spyOn(getMoviesUseCase, 'execute')
      .mockImplementation(() => Promise.resolve([movies]));
    const controllerResult = await controller.getAllMovies();
    expect(controllerResult).toMatchObject([movies]);
  });

  it('Get movie success', async () => {
    let movies = new MovieDto(
      'abc123',
      [],
      '2020-05-05',
      'George',
      'test',
      4,
      'test',
      [],
      '',
      '2025-05-05',
      [],
      [],
      'test',
      'test',
      [],
    );
    jest
      .spyOn(getMovieUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(movies));
    const controllerResult = await controller.getMovie('abc-123-123-128');
    expect(controllerResult).toMatchObject(movies);
  });

  it('Get all movies success', async () => {
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
    jest
      .spyOn(createMovieUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(new StatusOkDto('OK')));
    const controllerResult = await controller.createMovie(movieCreated);
    expect(controllerResult).toEqual({ status: 'OK', message: 'OK' });
  });

  it('Update movie success', async () => {
    let movieCreated = new UpdateMovieDto();
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
    jest
      .spyOn(updateMovieUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(new StatusOkDto('OK')));
    const controllerResult = await controller.updateMovie(
      'abc-123-123-123-1238',
      movieCreated,
    );
    expect(controllerResult).toEqual({ status: 'OK', message: 'OK' });
  });

  it('Delete movie success', async () => {
    let movieCreated = new UpdateMovieDto();
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
    jest
      .spyOn(deleteMovieUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(new StatusOkDto('OK')));
    const controllerResult = await controller.deleteMovie(
      'abc-123-123-123-1238',
    );
    expect(controllerResult).toEqual({ status: 'OK', message: 'OK' });
  });

  it('Sync movies success', async () => {
    jest
      .spyOn(syncMoviesUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(new StatusOkDto('OK')));
    const controllerResult = await controller.syncMovies();
    expect(controllerResult).toEqual({ status: 'OK', message: 'OK' });
  });
});
