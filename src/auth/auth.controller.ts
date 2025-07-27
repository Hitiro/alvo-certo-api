import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'users/entities/user.entity';

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
      console.log(error);
      throw new HttpException(
        'Erro durante o login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
