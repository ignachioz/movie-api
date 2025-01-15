import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'starship' })
export class Starship {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  url: string;
}
