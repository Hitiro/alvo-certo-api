import { Injectable } from '@nestjs/common';
import { CreateHistoryOfQueryDto } from './dto/create-history-of-query.dto';
import { UpdateHistoryOfQueryDto } from './dto/update-history-of-query.dto';
import { Repository } from 'typeorm';
import { HistoryOfQuery } from './entities/history-of-query.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HistoryOfQueryService {
  constructor(
    @InjectRepository(HistoryOfQuery)
    private readonly historyOfQuery: Repository<HistoryOfQuery>,
  ) {}

  async create(
    createHistoryOfQueryDto: CreateHistoryOfQueryDto,
    ip: string,
  ): Promise<HistoryOfQuery> {
    const data = await this.historyOfQuery.create({
      ...createHistoryOfQueryDto,
      ip_origem: ip,
    });
    console.log('\n\n data', data);
    const history = await this.historyOfQuery.save(data);
    return history;
  }

  findAll() {
    return `This action returns all historyOfQuery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyOfQuery`;
  }

  update(id: number, updateHistoryOfQueryDto: UpdateHistoryOfQueryDto) {
    console.log(updateHistoryOfQueryDto);
    return `This action updates a #${id} historyOfQuery`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyOfQuery`;
  }
}
