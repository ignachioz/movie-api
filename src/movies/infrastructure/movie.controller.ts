import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { MovieDto } from '../application/dto/movie.dto';
import {
  Body,
  Controller,
  Delete,
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
import { CreateMovieDto } from '../domain/dto/create-movie.dto';
import { UpdateMovieUseCase } from '../application/use-cases/update-movie.usecase';
import { UpdateMovieDto } from '../domain/dto/update-movie.dto';
import { DeleteMovieUseCase } from '../application/use-cases/delete-movie.usecase';
import { SyncMovieUseCase } from '../application/use-cases/sync-movie.usecase';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly getMoviesUseCase: GetMoviesUseCase,
    private readonly getMovieUseCase: GetMovieUseCase,
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
    private readonly syncMovieUseCase: SyncMovieUseCase,
  ) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllMovies(): Promise<Array<MovieDto>> {
    return this.getMoviesUseCase.execute();
  }

  @Get('/film/:id')
  @Roles('REGULAR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMovie(@Param('id') id: string): Promise<MovieDto> {
    return this.getMovieUseCase.execute(id);
  }

  @Post('/')
  @Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createMovie(@Body() body: CreateMovieDto): Promise<StatusOkDto> {
    return this.createMovieUseCase.execute(body);
  }

  @Patch('/:id')
  @Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateMovie(
    @Param('id') id: string,
    @Body() body: UpdateMovieDto,
  ): Promise<StatusOkDto> {
    return this.updateMovieUseCase.execute(id, body);
  }

  @Delete('/:id')
  @Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteMovie(@Param('id') id: string): Promise<StatusOkDto> {
    return this.deleteMovieUseCase.execute(id);
  }

  @Get('/sync-movie')
  @Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async syncMovies(): Promise<StatusOkDto> {
    return this.syncMovieUseCase.execute();
  }
}
