import { Module } from '@nestjs/common';
import { FindCnpjService } from './find-cnpj.service';
import { FindCnpjController } from './find-cnpj.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FindCnpjController],
  providers: [FindCnpjService],
  exports: [FindCnpjService],
})
export class FindCnpjModule {}
