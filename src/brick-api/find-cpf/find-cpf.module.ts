import { Module } from '@nestjs/common';
import { FindCpfService } from './find-cpf.service';
import { FindCpfController } from './find-cpf.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FindCpfController],
  providers: [FindCpfService],
  exports: [FindCpfService],
})
export class FindCpfModule {}
