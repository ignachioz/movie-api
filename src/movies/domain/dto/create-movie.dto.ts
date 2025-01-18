import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsArray()
  public characters: string[];
  @IsNotEmpty({ message: 'Field created cannot be empty' })
  public created: string;
  @IsNotEmpty({ message: 'Field director cannot be empty' })
  public director: string;
  @IsNotEmpty({ message: 'Field edited cannot be empty' })
  public edited: string;
  @IsNotEmpty({ message: 'Field episodeId cannot be empty' })
  public episodeId: number;
  @IsNotEmpty({ message: 'Field openingCrawl cannot be empty' })
  public openingCrawl: string;
  @IsArray()
  public planets: string[];
  @IsNotEmpty({ message: 'Field producer cannot be empty' })
  public producer: string;
  @IsNotEmpty({ message: 'Field releaseDate cannot be empty' })
  public releaseDate: string;
  @IsArray()
  public species: string[];
  @IsArray()
  public starships: string[];
  @IsNotEmpty({ message: 'Field title cannot be empty' })
  public title: string;
  @IsNotEmpty({ message: 'Field url cannot be empty' })
  public url: string;
  @IsArray()
  public vehicles: string[];
}
