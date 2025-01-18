import { Role } from './role.entity';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class User extends Document {
  @Prop({ type: String, default: uuidv4 })
  _id: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
