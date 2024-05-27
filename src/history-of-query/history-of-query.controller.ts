import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HistoryOfQueryService } from './history-of-query.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUserId } from 'infra/decorators/get-user.decorator';
import { Roles } from 'infra/decorators/roles.decorator';
import { Role } from 'infra/enums/role.enum';
import { ShowUserDto } from 'users/dto/show-user.dto';

@Controller('history-of-query')
export class HistoryOfQueryController {
  constructor(private readonly historyOfQueryService: HistoryOfQueryService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get()
  findAll(@GetUserId() user: ShowUserDto) {
    return this.historyOfQueryService.findAll(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get(':id')
  findOne(@Param('id') id: string, @GetUserId() user: ShowUserDto) {
    return this.historyOfQueryService.findOne(+id, user);
  }
}
