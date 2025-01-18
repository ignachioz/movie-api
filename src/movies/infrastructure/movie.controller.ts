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
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/exceptions/error-response';

@Controller('movie')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized exception',
  type: ErrorResponse,
})
@ApiConflictResponse({ description: 'Conflict exception', type: ErrorResponse })
@ApiNotFoundResponse({ description: 'Notfound exception', type: ErrorResponse })
@ApiInternalServerErrorResponse({
  description: 'Internal server exception',
  type: ErrorResponse,
})
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
  @ApiOperation({ summary: 'Get movies', description: 'Get movies' })
  @ApiOkResponse({
    description: 'Get movies successfull',
    type: [MovieDto],
  })
  async getAllMovies(): Promise<Array<MovieDto>> {
    return this.getMoviesUseCase.execute();
  }

  @Get('/film/:id')
  @Roles('REGULAR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get movie', description: 'Get movie' })
  @ApiOkResponse({
    description: 'Get movie successfull',
    type: MovieDto,
  })
  @ApiParam({ name: 'id', description: 'identification movie' })
  @ApiForbiddenResponse({
    description: 'Forbidden exception',
    type: ErrorResponse,
  })
  async getMovie(@Param('id') id: string): Promise<MovieDto> {
    return this.getMovieUseCase.execute(id);
  }

  @Post('/')
  @Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create movie', description: 'Create movie' })
  @ApiOkResponse({
    description: 'Create movie successfull',
    type: StatusOkDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden exception',
    type: ErrorResponse,
  })
  async createMovie(@Body() body: CreateMovieDto): Promise<StatusOkDto> {
    return this.createMovieUseCase.execute(body);
  }

  @Patch('/:id')
  @Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update movie', description: 'Update movie' })
  @ApiOkResponse({
    description: 'Update movie successfull',
    type: StatusOkDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden exception',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'id', description: 'identification movie' })
  async updateMovie(
    @Param('id') id: string,
    @Body() body: UpdateMovieDto,
  ): Promise<StatusOkDto> {
    return this.updateMovieUseCase.execute(id, body);
  }

  @Delete('/:id')
  @Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete movie', description: 'Delete movie' })
  @ApiOkResponse({
    description: 'Delete movie successfull',
    type: StatusOkDto,
  })
  @ApiParam({ name: 'id', description: 'identification movie' })
  @ApiForbiddenResponse({
    description: 'Forbidden exception',
    type: ErrorResponse,
  })
  async deleteMovie(@Param('id') id: string): Promise<StatusOkDto> {
    return this.deleteMovieUseCase.execute(id);
  }

  @Get('/sync-movie')
  @Roles('ADMINISTRATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Sync movies', description: 'Sync movies' })
  @ApiOkResponse({
    description: 'Sync movies successfull',
    type: StatusOkDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden exception',
    type: ErrorResponse,
  })
  async syncMovies(): Promise<StatusOkDto> {
    return this.syncMovieUseCase.execute();
  }
}
