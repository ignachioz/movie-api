import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { MovieDomainDto } from 'src/movies/domain/dto/movie-domain.dto';
import { SwapiAdapter } from 'src/movies/infrastructure/adapters/swapi.adapter';

describe('SwapiAdapter', () => {
  let swapiAdapter: SwapiAdapter;
  let httpService: HttpService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SwapiAdapter],
    }).compile();

    swapiAdapter = moduleRef.get<SwapiAdapter>(SwapiAdapter);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('save movie OK', async () => {
    let swapiResultDto = {
      results: [
        {
          characters: [],
          created: '2025-04-25',
          director: 'test',
          edited: 'test',
          episode_id: 4,
          opening_crawl: 'test',
          planets: [],
          producer: 'test',
          release_date: '2025-05-25',
          species: [],
          starships: [],
          title: 'test',
          url: 'test',
          vehicles: [],
        },
      ],
    };
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
    jest.spyOn(httpService, 'get').mockImplementation(() =>
      of({
        data: swapiResultDto,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: null,
      }),
    );
    const result = await swapiAdapter.findAllMovies();
    expect(result).toMatchObject([movieDomainDto]);
  });
});
