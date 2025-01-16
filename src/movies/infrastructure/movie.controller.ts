import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { MovieDto } from '../application/dto/movie.dto';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { GetMoviesUseCase } from '../application/use-cases/get-movies.usecase';
import { GetMovieUseCase } from './../application/use-cases/get-movie.usecase';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly getMoviesUseCase: GetMoviesUseCase,
    private readonly getMovieUseCase: GetMovieUseCase,
  ) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllMovies(): Promise<Array<MovieDto>> {
    return this.getMoviesUseCase.execute();
  }

  @Get('/:title')
  //@Roles('REGULAR')
  @UseGuards(JwtAuthGuard)
  async getMovie(@Param('title') title: string): Promise<MovieDto> {
    return this.getMovieUseCase.execute(title);
  }
}
