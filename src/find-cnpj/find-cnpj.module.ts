import { Module } from '@nestjs/common';
import { FindCnpjService } from './find-cnpj.service';
import { FindCnpjController } from './find-cnpj.controller';
import { HttpModule } from '@nestjs/axios';
import { ExtractOfUserModule } from 'extract-of-user/extract-of-user.module';
import { TypeOfQueryModule } from 'type-of-query/type-of-query.module';
import { HistoryOfQueryModule } from 'history-of-query/history-of-query.module';

@Module({
  imports: [
    HttpModule,
    ExtractOfUserModule,
    TypeOfQueryModule,
    HistoryOfQueryModule,
  ],
  controllers: [FindCnpjController],
  providers: [FindCnpjService],
  exports: [FindCnpjService],
})
export class FindCnpjModule {}
