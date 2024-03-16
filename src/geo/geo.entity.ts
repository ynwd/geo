import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Geo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'jsonb',
  })
  data: any;
}
