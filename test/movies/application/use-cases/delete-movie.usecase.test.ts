import {
  MovieRepository,
  MovieRepositorySymbol,
} from './../../../../src/movies/domain/ports/movie.repository.port';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { MovieAdapter } from 'src/movies/infrastructure/adapters/movie.adapter';
import { DeleteMovieUseCase } from 'src/movies/application/use-cases/delete-movie.usecase';

describe('Delete movie usecase', () => {
  let repository: MovieRepository;
  let deleteMovieUseCase: DeleteMovieUseCase;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        DeleteMovieUseCase,
        {
          provide: MovieRepositorySymbol,
          useValue: createMock<MovieAdapter>(),
        },
      ],
    }).compile();
    repository = moduleRef.get<MovieRepository>(MovieRepositorySymbol);
    deleteMovieUseCase = moduleRef.get<DeleteMovieUseCase>(DeleteMovieUseCase);
  });

  it('execute OK', async () => {
    jest.spyOn(repository, 'deleteMovie').mockReturnValue(Promise.resolve());
    const response = await deleteMovieUseCase.execute('abc-asdas-as22-128');
    expect(response).toMatchObject({
      message: 'MOVIE: abc-asdas-as22-128 DELETE SUCCESSFULL',
      status: 'OK',
    });
  });
});
