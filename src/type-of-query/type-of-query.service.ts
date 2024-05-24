import { Injectable } from '@nestjs/common';
import { CreateTypeOfQueryDto } from './dto/create-type-of-query.dto';
import { UpdateTypeOfQueryDto } from './dto/update-type-of-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOfQuery } from './entities/type-of-query.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOfQueryService {
  constructor(
    @InjectRepository(TypeOfQuery)
    private readonly typeOfQuery: Repository<TypeOfQuery>,
  ) {}
  create(createTypeOfQueryDto: CreateTypeOfQueryDto) {
    console.log(createTypeOfQueryDto);
    return 'This action adds a new typeOfQuery';
  }

  async findAll() {
    return await this.typeOfQuery.find();
  }

  async findOne(id: number) {
    return await this.typeOfQuery.findOneBy({ id: id });
  }

  update(id: number, updateTypeOfQueryDto: UpdateTypeOfQueryDto) {
    console.log(updateTypeOfQueryDto);
    return `This action updates a #${id} typeOfQuery`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeOfQuery`;
  }
}
