import {
  Controller,
  Get,
  // Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { FindCpfService } from './find-cpf.service';
import { FindCpfDto } from './dto/create-find-cpf.dto';
// import { UpdateFindCpfDto } from './dto/update-find-cpf.dto';

@Controller('find-cpf')
export class FindCpfController {
  constructor(private readonly findCpfService: FindCpfService) {}

  // @Post()
  // findCpf(@Body() createFindCpfDto: CreateFindCpfDto) {
  //   return this.findCpfService.findCpf(createFindCpfDto);
  // }

  @Get()
  findCpf(@Body() data: FindCpfDto) {
    return this.findCpfService.findCpf(data);
  }
}
