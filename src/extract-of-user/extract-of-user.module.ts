import { Module } from '@nestjs/common';
import { ExtractOfUserService } from './extract-of-user.service';
import { ExtractOfUserController } from './extract-of-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractOfUser } from './entities/extract-of-user.entity';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExtractOfUser]), UserModule],
  controllers: [ExtractOfUserController],
  providers: [ExtractOfUserService],
  exports: [ExtractOfUserService],
})
export class ExtractOfUserModule {}
