import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vehicle' })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  url: string;
}
