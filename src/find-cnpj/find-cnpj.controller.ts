import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { FindCnpjService } from './find-cnpj.service';
import { CreateFindCnpjDto } from './dto/create-find-cnpj.dto';
import { Roles } from 'src/infra/decorators/roles.decorator';
import { Role } from 'src/infra/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('find-cnpj')
export class FindCnpjController {
  constructor(private readonly findCnpjService: FindCnpjService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.User, Role.Admin)
  @Post()
  create(@Body() cnpj: CreateFindCnpjDto) {
    return this.findCnpjService.findData(cnpj);
  }
}
