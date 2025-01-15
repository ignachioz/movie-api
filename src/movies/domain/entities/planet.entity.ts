import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'planet' })
export class Planet {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  url: string;
}
