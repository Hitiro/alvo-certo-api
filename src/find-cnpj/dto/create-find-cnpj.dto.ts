import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFindCnpjDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  cpfcnpj: string;
}
