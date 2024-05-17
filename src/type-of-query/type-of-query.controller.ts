import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeOfQueryService } from './type-of-query.service';
import { CreateTypeOfQueryDto } from './dto/create-type-of-query.dto';
import { UpdateTypeOfQueryDto } from './dto/update-type-of-query.dto';

@Controller('type-of-query')
export class TypeOfQueryController {
  constructor(private readonly typeOfQueryService: TypeOfQueryService) {}

  @Post()
  create(@Body() createTypeOfQueryDto: CreateTypeOfQueryDto) {
    return this.typeOfQueryService.create(createTypeOfQueryDto);
  }

  @Get()
  findAll() {
    return this.typeOfQueryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeOfQueryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeOfQueryDto: UpdateTypeOfQueryDto,
  ) {
    return this.typeOfQueryService.update(+id, updateTypeOfQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeOfQueryService.remove(+id);
  }
}
