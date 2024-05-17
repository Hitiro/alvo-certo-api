import { Module } from '@nestjs/common';
import { TypeOfQueryService } from './type-of-query.service';
import { TypeOfQueryController } from './type-of-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfQuery } from './entities/type-of-query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfQuery])],
  controllers: [TypeOfQueryController],
  providers: [TypeOfQueryService],
  exports: [TypeOfQueryService],
})
export class TypeOfQueryModule {}
