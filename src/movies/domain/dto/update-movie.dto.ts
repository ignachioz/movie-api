import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  public characters?: string[];
  @ApiProperty()
  @IsOptional()
  public created?: string;
  @ApiProperty()
  @IsOptional()
  public director?: string;
  @ApiProperty()
  @IsOptional()
  public edited?: string;
  @ApiProperty()
  @IsOptional()
  public episodeId?: number;
  @ApiProperty()
  @IsOptional()
  public openingCrawl?: string;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  public planets?: string[];
  @ApiProperty()
  @IsOptional()
  public producer?: string;
  @ApiProperty()
  @IsOptional()
  public releaseDate?: string;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  public species?: string[];
  @ApiProperty()
  @IsArray()
  @IsOptional()
  public starships?: string[];
  @ApiProperty()
  @IsOptional()
  public title?: string;
  @ApiProperty()
  @IsOptional()
  public url?: string;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  public vehicles?: string[];
}
