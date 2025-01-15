import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'specie' })
export class Specie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  url: string;
}
