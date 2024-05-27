import { Injectable } from '@nestjs/common';
import { CreateHistoryOfQueryDto } from './dto/create-history-of-query.dto';
import { Repository } from 'typeorm';
import { HistoryOfQuery } from './entities/history-of-query.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowUserDto } from 'users/dto/show-user.dto';
import { ShowHistoryOfQueryDto } from './dto/show-history-of-query.dto';

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
    const history = await this.historyOfQuery.save(data);
    return history;
  }

  async findAll(user: ShowUserDto) {
    const result: ShowHistoryOfQueryDto[] = await this.historyOfQuery.find({
      where: { consultado_por: user.userId },
      order: { id: 'DESC' },
    });
    return result;
  }

  async findOne(id: number, user: ShowUserDto) {
    const result: ShowHistoryOfQueryDto = await this.historyOfQuery.findOne({
      where: { consultado_por: user.userId, id: id },
    });
    return result;
  }
}
