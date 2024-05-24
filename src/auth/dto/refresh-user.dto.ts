import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshUserDto {
  @IsNotEmpty()
  @ApiProperty()
  refresh_token: string;
}
