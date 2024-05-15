import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfilService: Repository<UserProfile>,
  ) {}

  async create(
    createUserProfileDto: CreateUserProfileDto,
    userId: number,
  ): Promise<UserProfile> {
    try {
      const newData = {
        ...createUserProfileDto,
        user_id: userId,
      };
      return await this.userProfilService.save(newData);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findOne(userId: number) {
    return this.userProfilService.findOneByOrFail({ user_id: userId });
  }

  async update(updateUserProfileDto: UpdateUserProfileDto, userId: number) {
    const userProfile = await this.userProfilService.findOneBy({
      user_id: userId,
    });

    if (!userProfile) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const newUserProfile = await this.userProfilService.merge(
      userProfile,
      updateUserProfileDto,
    );

    const updatedUser = await this.userProfilService.save(newUserProfile);
    return updatedUser;
  }
}
