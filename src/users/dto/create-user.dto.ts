import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Hitiro Tsugawa' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ examples: ['hitiro@live.com', 'hitiro.tecnico@gmail.com'] })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '********' })
  password: string;
}
