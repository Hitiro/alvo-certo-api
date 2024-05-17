import { PartialType } from '@nestjs/swagger';
import { CreateExtractOfUserDto } from './create-extract-of-user.dto';

export class UpdateExtractOfUserDto extends PartialType(
  CreateExtractOfUserDto,
) {}
