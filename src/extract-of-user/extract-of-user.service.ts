import { Injectable } from '@nestjs/common';
import { CreateExtractOfUserDto } from './dto/create-extract-of-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractOfUser } from './entities/extract-of-user.entity';
import { Repository } from 'typeorm';
import { AddAmountUser } from './dto/balance-extract-of-user.dto';
import { UserService } from 'users/users.service';
import { ShowUserDto } from 'users/dto/show-user.dto';

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
    const { id: reciverId } = await this.dataOfUser.findOneByEmail(
      addAmountUser.reciveUser,
    );

    const existingExtracts = await this.extractOfUserRepository.find({
      where: { id_usuario: reciverId },
      order: { id: 'ASC' },
    });

    let finalBalance: number;

    if (existingExtracts.length === 0) {
      finalBalance = addAmountUser.amount;
    } else {
      const lastExtract = existingExtracts[existingExtracts.length - 1];
      finalBalance = lastExtract.saldo + addAmountUser.amount;
    }

    const newExtract = this.extractOfUserRepository.create({
      observacao: `${addAmountUser.amount} RECARGA MANUAL FEITA PELO ${user.role} ${user.username} ID: ${user.userId}`,
      saldo: finalBalance,
      valor: addAmountUser.amount,
      ip_origem: ip,
      id_usuario: reciverId,
    });

    const savedData = await this.extractOfUserRepository.save(newExtract);
    return savedData;
  }

  create(createExtractOfUserDto: CreateExtractOfUserDto) {
    console.log(createExtractOfUserDto);
    return 'This action adds a new extractOfUser';
  }

  findAll() {
    return `This action returns all extractOfUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} extractOfUser`;
  }

  async findByUser(email: string) {
    const { id: userId } = await this.dataOfUser.findOneByEmail(email);

    const existingExtracts = await this.extractOfUserRepository.find({
      where: { id_usuario: userId },
      order: { id: 'DESC' },
    });

    return `${existingExtracts}`;
  }

  async getCurrentBalance(userId: number): Promise<number> {
    const lastExtract = await this.extractOfUserRepository.findOne({
      where: { id_usuario: userId },
      order: { id: 'DESC' },
    });

    if (!lastExtract) return 0;

    return lastExtract.saldo;
  }
}
