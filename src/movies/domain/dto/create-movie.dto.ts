import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsArray()
  public characters: string[];
  @ApiProperty()
  @IsNotEmpty({ message: 'Field created cannot be empty' })
  public created: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Field director cannot be empty' })
  public director: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Field edited cannot be empty' })
  public edited: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Field episodeId cannot be empty' })
  public episodeId: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'Field openingCrawl cannot be empty' })
  public openingCrawl: string;
  @ApiProperty()
  @IsArray()
  public planets: string[];
  @ApiProperty()
  @IsNotEmpty({ message: 'Field producer cannot be empty' })
  public producer: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Field releaseDate cannot be empty' })
  public releaseDate: string;
  @ApiProperty()
  @IsArray()
  public species: string[];
  @ApiProperty()
  @IsArray()
  public starships: string[];
  @ApiProperty()
  @IsNotEmpty({ message: 'Field title cannot be empty' })
  public title: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Field url cannot be empty' })
  public url: string;
  @ApiProperty()
  @IsArray()
  public vehicles: string[];
}
