import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  cpfcnpj: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  sobrenome: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  cep: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  rua: string;

  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  bairro: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  cidade: string;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  estado: string;

  @IsNumber()
  @IsOptional()
  user_id: number;
}
