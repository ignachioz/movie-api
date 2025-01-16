import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { MovieDto } from '../application/dto/movie.dto';
import { GetMovieUseCase } from './../application/use-cases/get-movie.usecase';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('movie')
export class MovieController {
  constructor(private readonly getMovieUseCase: GetMovieUseCase) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllMovies(): Promise<Array<MovieDto>> {
    return this.getMovieUseCase.execute();
  }
}
