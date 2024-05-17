import { PartialType } from '@nestjs/swagger';
import { CreateHistoryOfQueryDto } from './create-history-of-query.dto';

export class UpdateHistoryOfQueryDto extends PartialType(
  CreateHistoryOfQueryDto,
) {}
