import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { encryptPassword } from 'utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    user.password = await encryptPassword(user.password);
    const createUser = await this.userRepository.save(user);
    delete createUser.password;
    return createUser;
  }

  async findAll() {
    const users = await this.userRepository.find();
    users.forEach((user) => delete user.password);
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    delete user.password;
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user.active) {
      throw new BadRequestException(
        'Este usuário está inativo e não pode receber saldo',
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    if (updateUserDto.password) {
      user.password = await encryptPassword(updateUserDto.password);
    }

    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;

    return updatedUser;
  }

  async remove(id: number) {
    const deleted = await this.userRepository.findOneBy({ id: id });

    this.userRepository.softDelete({ id });
    return deleted;
  }
}
