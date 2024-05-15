import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { GetUserId } from 'src/infra/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @GetUserId() user,
  ) {
    return this.userProfileService.create(createUserProfileDto, user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOne(@GetUserId() user) {
    return this.userProfileService.findOne(user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @GetUserId() user,
  ) {
    return this.userProfileService.update(updateUserProfileDto, user.userId);
  }
}
