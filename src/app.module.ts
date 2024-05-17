import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../ormconfig';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { FindCnpjModule } from './find-cnpj/find-cnpj.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './infra/guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOfQueryModule } from './type-of-query/type-of-query.module';
import { HistoryOfQueryModule } from './history-of-query/history-of-query.module';
import { ExtractOfUserModule } from './extract-of-user/extract-of-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    UserProfileModule,
    FindCnpjModule,
    JwtModule,
    TypeOfQueryModule,
    HistoryOfQueryModule,
    ExtractOfUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
