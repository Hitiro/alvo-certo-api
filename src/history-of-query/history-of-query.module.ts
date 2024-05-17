import { Module } from '@nestjs/common';
import { HistoryOfQueryService } from './history-of-query.service';
import { HistoryOfQueryController } from './history-of-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryOfQuery } from './entities/history-of-query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryOfQuery])],
  controllers: [HistoryOfQueryController],
  providers: [HistoryOfQueryService],
  exports: [HistoryOfQueryService],
})
export class HistoryOfQueryModule {}
