import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ExtractOfUserService } from './extract-of-user.service';
import { Roles } from 'src/infra/decorators/roles.decorator';
import { Role } from 'src/infra/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/infra/decorators/get-user.decorator';
import { AddAmountUser } from './dto/balance-extract-of-user.dto';
import { GetIpAddress } from 'src/infra/decorators/get-ip-origin';

@Controller('extract-of-user')
@UseGuards(AuthGuard('jwt'))
export class ExtractOfUserController {
  constructor(private readonly extractOfUserService: ExtractOfUserService) {}

  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  findAll(@GetUserId() user) {
    return this.extractOfUserService.findAll();
  }

  @Post('add')
  @Roles(Role.SuperAdmin)
  async addBalance(
    @Body() addAmountUser: AddAmountUser,
    @GetUserId() user,
    @GetIpAddress() ip: string,
  ) {
    return await this.extractOfUserService.addBalance(addAmountUser, user, ip);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.extractOfUserService.findOne(id);
  }

  @Get('user/:id')
  @Roles(Role.Admin, Role.SuperAdmin)
  findByUser(@Param('id') id: number) {
    return this.extractOfUserService.findByUser(id);
  }
}
