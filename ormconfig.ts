import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export type DatabaseType = 'postgres';
const database = process.env.TYPEORM_BD as DatabaseType;
const port: number = Number(process.env.TYPEORM_PORT);

export const typeOrmConfig: DataSourceOptions = {
  type: database,
  host: process.env.TYPEORM_HOST,
  port: port,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: ['dist/migrations/*{.ts,.js}'],
  // migrations: ['src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_history',
  migrationsRun: true,
  entities: [__dirname + '/**/*.entity{.js,.ts}'], // Assuming entities are in src directory
  synchronize: false,
};

const dataSource = new DataSource(typeOrmConfig);
export default dataSource;
