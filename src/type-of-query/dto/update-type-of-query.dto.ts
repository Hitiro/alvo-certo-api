import { PartialType } from '@nestjs/swagger';
import { CreateTypeOfQueryDto } from './create-type-of-query.dto';

export class UpdateTypeOfQueryDto extends PartialType(CreateTypeOfQueryDto) {}
