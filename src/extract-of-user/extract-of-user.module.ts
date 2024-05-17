import { Module } from '@nestjs/common';
import { ExtractOfUserService } from './extract-of-user.service';
import { ExtractOfUserController } from './extract-of-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractOfUser } from './entities/extract-of-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExtractOfUser])],
  controllers: [ExtractOfUserController],
  providers: [ExtractOfUserService],
  exports: [ExtractOfUserService],
})
export class ExtractOfUserModule {}
