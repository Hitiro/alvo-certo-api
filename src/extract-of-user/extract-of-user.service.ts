import { Injectable } from '@nestjs/common';
import { CreateExtractOfUserDto } from './dto/create-extract-of-user.dto';
import { UpdateExtractOfUserDto } from './dto/update-extract-of-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractOfUser } from './entities/extract-of-user.entity';
import { Repository } from 'typeorm';
import { AddAmountUser } from './dto/balance-extract-of-user.dto';
import { UserService } from 'src/users/users.service';
import { ShowUserDto } from 'src/users/dto/show-user.dto';

@Injectable()
export class ExtractOfUserService {
  constructor(
    @InjectRepository(ExtractOfUser)
    private readonly extractOfUserRepository: Repository<ExtractOfUser>,
    private dataOfUser: UserService,
  ) {}

  async addBalance(
    addAmountUser: AddAmountUser,
    user: ShowUserDto,
    ip: string,
  ) {
    const {
      id: userId,
      name,
      email,
    } = await this.dataOfUser.findOneByEmail(addAmountUser.reciveUser);

    const existingExtracts = await this.extractOfUserRepository.find({
      where: { id_usuario: userId },
      order: { id: 'ASC' },
    });

    let finalBalance: number;
    if (existingExtracts.length === 0) {
      finalBalance = 0;
    } else {
      const lastExtract = existingExtracts[existingExtracts.length - 1];
      finalBalance = lastExtract.saldo + addAmountUser.amount;
    }

    const newExtract = this.extractOfUserRepository.create({
      observacao: `RECARGA MANUAL FEITA PELO ${user.username}`,
      saldo: finalBalance,
      valor: addAmountUser.amount,
      ip_origem: ip,
      id_usuario: user.userId,
    });

    const savedData = await this.extractOfUserRepository.save(newExtract);

    return savedData;
  }

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
