import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { FindCnpjService } from './find-cnpj.service';
import { CreateFindCnpjDto } from './dto/create-find-cnpj.dto';
import { Roles } from 'infra/decorators/roles.decorator';
import { Role } from 'infra/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'infra/decorators/get-user.decorator';
import { ShowUserDto } from 'users/dto/show-user.dto';
import { GetIpAddress } from 'infra/decorators/get-ip-origin.decorator';

@Controller('find-cnpj')
export class FindCnpjController {
  constructor(private readonly findCnpjService: FindCnpjService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Post()
  create(
    @Body() cnpj: CreateFindCnpjDto,
    @GetUserId() user: ShowUserDto,
    @GetIpAddress() ip: string,
  ) {
    return this.findCnpjService.findData(cnpj, user, ip);
  }
}
