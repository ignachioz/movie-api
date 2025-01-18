import { IsArray, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsArray()
  public characters?: string[];
  @IsOptional()
  public created?: string;
  @IsOptional()
  public director?: string;
  @IsOptional()
  public edited?: string;
  @IsOptional()
  public episodeId?: number;
  @IsOptional()
  public openingCrawl?: string;
  @IsArray()
  @IsOptional()
  public planets?: string[];
  @IsOptional()
  public producer?: string;
  @IsOptional()
  public releaseDate?: string;
  @IsArray()
  @IsOptional()
  public species?: string[];
  @IsArray()
  @IsOptional()
  public starships?: string[];
  @IsOptional()
  public title?: string;
  @IsOptional()
  public url?: string;
  @IsArray()
  @IsOptional()
  public vehicles?: string[];
}
