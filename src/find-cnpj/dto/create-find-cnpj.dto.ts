import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFindCnpjDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  cpfcnpj: string;

  @IsArray()
  @IsNotEmpty()
  pesquisar: searchFields[];
}

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
