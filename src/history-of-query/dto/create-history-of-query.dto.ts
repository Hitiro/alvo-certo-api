import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoryOfQueryDto {
  @IsNotEmpty()
  @IsNumber()
  id_tipo_consulta: number;

  @IsNotEmpty()
  @IsString()
  chave: string;

  @IsNotEmpty()
  @IsString()
  conjunto_dados: string;

  @IsNotEmpty()
  @IsNumber()
  custo: number;

  @IsNotEmpty()
  @IsNumber()
  consultado_por: number;
}
