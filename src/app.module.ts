import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from '../ormconfig';
import { UsersModule } from './users/users.module';
// import { AppDataSource } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot(AppDataSource),
    TypeOrmModule.forRoot(typeOrmConfig),
    // TypeOrmModule.forRoot({
    //   type: process.env.TYPEORM_BD,
    //   host: process.env.TYPEORM_HOST,
    //   port: process.env.TYPEORM_PORT,
    //   username: process.env.TYPEORM_USERNAME,
    //   password: process.env.TYPEORM_PASSWORD,
    //   database: process.env.TYPEORM_DATABASE,
    //   synchronize: false,
    //   migrations: ['dist/migrations/*{.ts,.js}'],
    //   migrationsTableName: 'migrations_history',
    //   migrationsRun: true,
    //   entities: [__dirname + '/**/*.entity{.js,.ts}'],
    // } as TypeOrmModuleOptions),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
