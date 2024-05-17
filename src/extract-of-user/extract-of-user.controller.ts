import { Controller, Get, Param } from '@nestjs/common';
import { ExtractOfUserService } from './extract-of-user.service';

@Controller('extract-of-user')
export class ExtractOfUserController {
  constructor(private readonly extractOfUserService: ExtractOfUserService) {}

  @Get()
  findAll() {
    return this.extractOfUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.extractOfUserService.findOne(id);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: number) {
    return this.extractOfUserService.findByUser(id);
  }
}
