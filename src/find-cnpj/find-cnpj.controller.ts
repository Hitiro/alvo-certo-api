import { Controller, Post, Body } from '@nestjs/common';
import { FindCnpjService } from './find-cnpj.service';
import { CreateFindCnpjDto } from './dto/create-find-cnpj.dto';

@Controller('find-cnpj')
export class FindCnpjController {
  constructor(private readonly findCnpjService: FindCnpjService) {}

  @Post()
  create(@Body() cnpj: CreateFindCnpjDto) {
    return this.findCnpjService.findData(cnpj);
  }
}
