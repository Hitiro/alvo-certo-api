import { Controller, Get, Body } from '@nestjs/common';
import { FindCpfService } from './find-cpf.service';
import { FindCpfDto } from './dto/create-find-cpf.dto';

@Controller('find-cpf')
export class FindCpfController {
  constructor(private readonly findCpfService: FindCpfService) {}

  @Get()
  findCpf(@Body() data: FindCpfDto) {
    return this.findCpfService.findCpf(data);
  }
}
