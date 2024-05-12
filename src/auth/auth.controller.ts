import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ user: User; token: string }> {
    try {
      const { user, token } = await this.authService.login(loginUserDto);
      return { user, token };
    } catch (error) {
      throw new HttpException(
        'Erro durante o login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
