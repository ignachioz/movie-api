import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'character' })
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  url: string;
}
