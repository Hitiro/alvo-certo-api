import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTypeOfQueryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nome_consulta: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(5)
  prefixo_consulta: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
