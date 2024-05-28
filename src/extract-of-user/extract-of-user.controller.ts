import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ExtractOfUserService } from './extract-of-user.service';
import { Roles } from 'infra/decorators/roles.decorator';
import { Role } from 'infra/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'infra/decorators/get-user.decorator';
import { AddAmountUser } from './dto/balance-extract-of-user.dto';
import { GetIpAddress } from 'infra/decorators/get-ip-origin.decorator';

@Controller('extract-of-user')
@UseGuards(AuthGuard('jwt'))
export class ExtractOfUserController {
  constructor(private readonly extractOfUserService: ExtractOfUserService) {}

  @Get()
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  findAll(@GetUserId() user) {
    console.log(user);
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

  @Get('user/:email')
  @Roles(Role.Admin, Role.SuperAdmin)
  findByUser(@Param('id') email: string) {
    return this.extractOfUserService.findByUser(email);
  }
}
