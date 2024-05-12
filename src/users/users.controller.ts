import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: 'users',
})
@ApiTags('Usuários')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    const user: any = await this.usersService.register(createUserDto);
    const payload = { id: user.id, email: user.email };

    return {
      message: 'Usuário registrado com sucesso!',
      token: payload,
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
