import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DatabaseException } from 'src/common/exceptions/database-exception';
import { CreateMovieDto } from 'src/movies/domain/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/domain/dto/update-movie.dto';
import { Movie } from 'src/movies/domain/entities/movie.entity';
import { MovieAdapter } from 'src/movies/infrastructure/adapters/movie.adapter';

describe('AuthAdapter', () => {
  let movieAdapter: MovieAdapter;
  let movieModel: Model<Movie>;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MovieAdapter,
        {
          provide: getModelToken(Movie.name),
          useValue: {},
        },
      ],
    }).compile();

    movieAdapter = moduleRef.get<MovieAdapter>(MovieAdapter);
    movieModel = moduleRef.get<Model<Movie>>(getModelToken(Movie.name));
  });

  it('save movie OK', async () => {
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
    movieModel.create = jest.fn().mockResolvedValue(movieCreated);
    const result = await movieAdapter.saveMovie(movieCreated);
    expect(result).toMatchObject(movieCreated);
  });

  it('save movie error', async () => {
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
    let username = 'prueba123';
    movieModel.create = jest
      .fn()
      .mockRejectedValue(new Error('EXCEPTION DATABASE'));
    try {
      await movieAdapter.saveMovie(movieCreated);
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });

  it('find all movies OK', async () => {
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
    movieModel.find = jest.fn().mockResolvedValue([movieCreated]);
    const result = await movieAdapter.findAllMovies();
    expect(result).toMatchObject([movieCreated]);
  });

  it('find all movies error', async () => {
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
    movieModel.find = jest
      .fn()
      .mockRejectedValue(new Error('EXCEPTION DATABASE'));
    try {
      await movieAdapter.findAllMovies();
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });

  it('find one OK', async () => {
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
    movieModel.findOne = jest.fn().mockResolvedValue(movieCreated);
    const result = await movieAdapter.findMovieByField('title', 'A new hope');
    expect(result).toMatchObject(movieCreated);
  });

  it('find one error', async () => {
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
    movieModel.findOne = jest
      .fn()
      .mockRejectedValue(new Error('EXCEPTION DATABASE'));
    try {
      const result = await movieAdapter.findMovieByField('title', 'A new hope');
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });

  it('delete movie OK', async () => {
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
    movieModel.findByIdAndDelete = jest.fn().mockResolvedValue(movieCreated);
    await movieAdapter.deleteMovie('1');
    expect(movieModel.findByIdAndDelete).toHaveBeenCalled();
  });

  it('delete movie error', async () => {
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
    movieModel.findByIdAndDelete = jest
      .fn()
      .mockRejectedValue(new Error('EXCEPTION DATABASE'));
    try {
      await movieAdapter.deleteMovie('1');
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });

  it('delete movie error - doesnt exist in DB', async () => {
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
    movieModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    try {
      await movieAdapter.deleteMovie('1');
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });

  it('update movie OK', async () => {
    let movieUpdate = new UpdateMovieDto();
    movieUpdate.director = 'TEST DIRECTO UPDATE';
    let movieUpdated = new UpdateMovieDto();
    movieUpdated.characters = ['test'];
    movieUpdated.vehicles = ['test'];
    movieUpdated.starships = ['test'];
    movieUpdated.planets = ['test'];
    movieUpdated.species = ['test'];
    movieUpdated.releaseDate = '2025-05-05';
    movieUpdated.producer = 'George';
    movieUpdated.title = 'A new hope';
    movieUpdated.url = 'testurl';
    movieUpdated.episodeId = 4;
    movieUpdated.openingCrawl = 'test';
    movieUpdated.edited = 'George';
    movieModel.findByIdAndUpdate = jest.fn().mockResolvedValue({
      ...movieUpdated,
      director: movieUpdate.director,
    });
    const result = await movieAdapter.updateMovie(
      movieUpdate,
      'abc-123-123-123',
    );
    expect(result).toMatchObject(movieUpdated);
  });

  it('update movie error', async () => {
    let movieUpdate = new UpdateMovieDto();
    movieUpdate.director = 'TEST DIRECTO UPDATE';
    let movieUpdated = new UpdateMovieDto();
    movieUpdated.characters = ['test'];
    movieUpdated.vehicles = ['test'];
    movieUpdated.starships = ['test'];
    movieUpdated.planets = ['test'];
    movieUpdated.species = ['test'];
    movieUpdated.releaseDate = '2025-05-05';
    movieUpdated.producer = 'George';
    movieUpdated.title = 'A new hope';
    movieUpdated.url = 'testurl';
    movieUpdated.episodeId = 4;
    movieUpdated.openingCrawl = 'test';
    movieUpdated.edited = 'George';
    movieModel.findByIdAndUpdate = jest
      .fn()
      .mockRejectedValue(new Error('EXCEPTION DATABASE'));
    try {
      await movieAdapter.updateMovie(movieUpdate, 'abc-123-123-123');
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });

  it('update movie error - movie doesnt exist', async () => {
    let movieUpdate = new UpdateMovieDto();
    movieUpdate.director = 'TEST DIRECTO UPDATE';
    let movieUpdated = new UpdateMovieDto();
    movieUpdated.characters = ['test'];
    movieUpdated.vehicles = ['test'];
    movieUpdated.starships = ['test'];
    movieUpdated.planets = ['test'];
    movieUpdated.species = ['test'];
    movieUpdated.releaseDate = '2025-05-05';
    movieUpdated.producer = 'George';
    movieUpdated.title = 'A new hope';
    movieUpdated.url = 'testurl';
    movieUpdated.episodeId = 4;
    movieUpdated.openingCrawl = 'test';
    movieUpdated.edited = 'George';
    movieModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    try {
      await movieAdapter.updateMovie(movieUpdate, 'abc-123-123-123');
    } catch (e) {
      expect(e).toBeInstanceOf(DatabaseException);
    }
  });
});
