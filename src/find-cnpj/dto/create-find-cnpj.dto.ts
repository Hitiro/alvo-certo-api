import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateFindCnpjDto {
  @IsString()
  @IsNotEmpty()
  @Length(14)
  cnpj: string;

  @IsArray()
  @IsNotEmpty()
  pesquisar: searchFields[];

  @IsNumber()
  @IsNotEmpty()
  id_tipo_consulta: number;

  @IsString()
  @IsNotEmpty()
  tipo_dado: string;
}

// TODO: Tratar no banco de dados.
export enum searchFields {
  'NOME FANTASIA' = 1,
  'RAZAO SOCIAL',
  CNPJ,
  STATUS,
  SETOR,
  'CNAE PRINCIPAL DESCRICAO',
  'CNAE PRINCIPAL CODIGO',
  CEP,
  'DATA ABERTURA',
  DDD,
  TELEFONE,
  EMAIL,
  'TIPO LOGRADOURO',
  LOGRADOURO,
  NUMERO,
  COMPLEMENTO,
  BAIRRO,
  MUNICIPIO,
  UF,
}
