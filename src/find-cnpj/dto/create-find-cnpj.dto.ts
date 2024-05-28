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

export const groupSearchFields = {
  BASICO: {
    'NOME FANTASIA': searchFields['NOME FANTASIA'],
    'RAZAO SOCIAL': searchFields['RAZAO SOCIAL'],
    CNPJ: searchFields.CNPJ,
    STATUS: searchFields.STATUS,
    SETOR: searchFields.SETOR,
  },
  CNAE: {
    'CNAE PRINCIPAL DESCRICAO': searchFields['CNAE PRINCIPAL DESCRICAO'],
    'CNAE PRINCIPAL CODIGO': searchFields['CNAE PRINCIPAL CODIGO'],
  },
  CONTATO: {
    DDD: searchFields.DDD,
    TELEFONE: searchFields.TELEFONE,
    EMAIL: searchFields.EMAIL,
  },
  ENDERECO: {
    CEP: searchFields.CEP,
    'TIPO LOGRADOURO': searchFields['TIPO LOGRADOURO'],
    LOGRADOURO: searchFields.LOGRADOURO,
    NUMERO: searchFields.NUMERO,
    COMPLEMENTO: searchFields.COMPLEMENTO,
    BAIRRO: searchFields.BAIRRO,
    MUNICIPIO: searchFields.MUNICIPIO,
    UF: searchFields.UF,
  },
};
