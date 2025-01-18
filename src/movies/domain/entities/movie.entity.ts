import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
@Schema()
export class Movie extends Document {
  @Prop({ type: String, default: uuidv4 })
  _id: string;
  @Prop()
  characters: string[];
  @Prop()
  created: string;
  @Prop()
  director: string;
  @Prop()
  edited: string;
  @Prop()
  episodeId: number;
  @Prop()
  openingCrawl: string;
  @Prop()
  planets: string[];
  @Prop()
  producer: string;
  @Prop()
  releaseDate: string;
  @Prop()
  species: string[];
  @Prop()
  starships: string[];
  @Prop()
  title: string;
  @Prop()
  url: string;
  @Prop()
  vehicles: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
