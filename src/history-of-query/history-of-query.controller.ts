import { Controller, Get, Param } from '@nestjs/common';
import { HistoryOfQueryService } from './history-of-query.service';

@Controller('history-of-query')
export class HistoryOfQueryController {
  constructor(private readonly historyOfQueryService: HistoryOfQueryService) {}

  @Get()
  findAll() {
    return this.historyOfQueryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyOfQueryService.findOne(+id);
  }
}
