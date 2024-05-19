export class responseCnpj {
  message: string;
  success: boolean;
  response: Resultado;
}

export interface Resultado {
  'NOME FANTASIA'?: string;
  'RAZAO SOCIAL'?: string;
  CNPJ?: string;
  STATUS?: string;
  SETOR?: string;
  'CNAE PRINCIPAL DESCRICAO'?: string;
  'CNAE PRINCIPAL CODIGO'?: string;
  CEP?: string;
  'DATA ABERTURA'?: string;
  DDD?: string;
  TELEFONE?: string;
  EMAIL?: string;
  'TIPO LOGRADOURO'?: string;
  LOGRADOURO?: string;
  NUMERO?: string;
  COMPLEMENTO?: string;
  BAIRRO?: string;
  MUNICIPIO?: string;
  UF?: string;
}
