import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { MovieDto } from '../application/dto/movie.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetMoviesUseCase } from '../application/use-cases/get-movies.usecase';
import { GetMovieUseCase } from './../application/use-cases/get-movie.usecase';
import { CreateMovieUseCase } from '../application/use-cases/create-movie.usecase';
import { StatusOkDto } from '../application/dto/status-ok.dto';
import { MovieMapper } from './mapper/movie.mapper';
import { MovieRequestDto } from './dto/movie-request.dto';
import { UpdateMovieUseCase } from '../application/use-cases/update-movie.usecase';
import { UpdateMovieRequestDto } from './dto/update-movie-request.dto';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly getMoviesUseCase: GetMoviesUseCase,
    private readonly getMovieUseCase: GetMovieUseCase,
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllMovies(): Promise<Array<MovieDto>> {
    return this.getMoviesUseCase.execute();
  }

  @Get('/:id')
  //@Roles('REGULAR')
  @UseGuards(JwtAuthGuard)
  async getMovie(@Param('id') id: string): Promise<MovieDto> {
    return this.getMovieUseCase.execute(id);
  }

  @Post('/')
  //@Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard)
  async createMovie(@Body() body: MovieRequestDto): Promise<StatusOkDto> {
    return this.createMovieUseCase.execute(MovieMapper.movieToDomain(body));
  }

  @Patch('/:id')
  //@Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard)
  async updateMovie(
    @Param('id') id: string,
    @Body() body: UpdateMovieRequestDto,
  ): Promise<StatusOkDto> {
    return this.updateMovieUseCase.execute(
      id,
      MovieMapper.updateMovieToDomain(body),
    );
  }
}
