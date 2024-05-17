import { Injectable } from '@nestjs/common';
import { CreateHistoryOfQueryDto } from './dto/create-history-of-query.dto';
import { UpdateHistoryOfQueryDto } from './dto/update-history-of-query.dto';

@Injectable()
export class HistoryOfQueryService {
  create(createHistoryOfQueryDto: CreateHistoryOfQueryDto) {
    return 'This action adds a new historyOfQuery';
  }

  findAll() {
    return `This action returns all historyOfQuery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyOfQuery`;
  }

  update(id: number, updateHistoryOfQueryDto: UpdateHistoryOfQueryDto) {
    return `This action updates a #${id} historyOfQuery`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyOfQuery`;
  }
}
