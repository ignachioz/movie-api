import { Movie } from 'src/movies/domain/entities/movie.entity';
import { MovieRepository } from './../../domain/ports/movie.repository.port';
import { DatabaseException } from 'src/common/exceptions/database-exception';
import { CreateMovieDto } from 'src/movies/domain/dto/create-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateMovieDto } from 'src/movies/domain/dto/update-movie.dto';
export class MovieAdapter implements MovieRepository {
  constructor(
    @InjectModel(Movie.name) private movieDBRepository: Model<Movie>,
  ) {}

  async saveMovie(movie: CreateMovieDto): Promise<Movie> {
    try {
      const createMovie = new this.movieDBRepository(movie);
      return await this.movieDBRepository.create(createMovie);
    } catch (e) {
      throw new DatabaseException('SAVE MOVIE:' + e);
    }
  }

  async findAllMovies(): Promise<Array<Movie>> {
    try {
      return await this.movieDBRepository.find();
    } catch (e) {
      throw new DatabaseException('FIND ALL MOVIES:' + e);
    }
  }

  async findMovieByField(field: string, value: string): Promise<Movie> {
    try {
      return await this.movieDBRepository.findOne({ [field]: value });
    } catch (e) {
      throw new DatabaseException(`FIND MOVIE BY: ${field} - (${value}):` + e);
    }
  }

  async deleteMovie(id: string): Promise<void> {
    try {
      const result = await this.movieDBRepository.findByIdAndDelete(id);
      if (!result) throw new Error("MOVIE DOESN'T EXIST IN DB: " + id);
    } catch (e) {
      throw new DatabaseException(`DELETE MOVIE - ${id}` + e);
    }
  }

  async updateMovie(movieUpdate: UpdateMovieDto, id: string): Promise<Movie> {
    try {
      const result = await this.movieDBRepository.findByIdAndUpdate(
        id,
        { $set: movieUpdate },
        { new: true },
      );
      if (!result) throw new Error("MOVIE DOESN'T EXIST IN DB: " + id);
      return result;
    } catch (e) {
      throw new DatabaseException(`DELETE MOVIE - ${id}` + e);
    }
  }
}
