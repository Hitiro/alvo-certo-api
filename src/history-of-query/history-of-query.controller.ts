import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoryOfQueryService } from './history-of-query.service';
import { CreateHistoryOfQueryDto } from './dto/create-history-of-query.dto';
import { UpdateHistoryOfQueryDto } from './dto/update-history-of-query.dto';

@Controller('history-of-query')
export class HistoryOfQueryController {
  constructor(private readonly historyOfQueryService: HistoryOfQueryService) {}

  @Post()
  create(@Body() createHistoryOfQueryDto: CreateHistoryOfQueryDto) {
    return this.historyOfQueryService.create(createHistoryOfQueryDto);
  }

  @Get()
  findAll() {
    return this.historyOfQueryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyOfQueryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistoryOfQueryDto: UpdateHistoryOfQueryDto,
  ) {
    return this.historyOfQueryService.update(+id, updateHistoryOfQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyOfQueryService.remove(+id);
  }
}
