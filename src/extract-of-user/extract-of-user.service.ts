import { Injectable } from '@nestjs/common';
import { CreateExtractOfUserDto } from './dto/create-extract-of-user.dto';
import { UpdateExtractOfUserDto } from './dto/update-extract-of-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractOfUser } from './entities/extract-of-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExtractOfUserService {
  constructor(
    @InjectRepository(ExtractOfUser)
    private readonly extractOfUser: Repository<ExtractOfUser>,
  ) {}

  create(createExtractOfUserDto: CreateExtractOfUserDto) {
    return 'This action adds a new extractOfUser';
  }

  findAll() {
    return `This action returns all extractOfUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} extractOfUser`;
  }

  findByUser(id: number) {
    return `retorna todo o extrato de um usuário`;
  }
}
