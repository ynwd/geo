import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Geo } from './geo/geo.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  logging: false,
  entities: [Geo],
  synchronize: false,
  migrations: ['src/migration/*.{ts,js}'],
});
