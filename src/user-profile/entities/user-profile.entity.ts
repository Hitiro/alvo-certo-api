import { ApiProperty } from '@nestjs/swagger';

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tb_perfil_usuario' })
export class UserProfile {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  cpfcnpj: string;

  @Column()
  @ApiProperty()
  nome: string;

  @Column()
  @ApiProperty()
  sobrenome: string;

  @Column()
  @ApiProperty()
  cep: string;

  @Column()
  @ApiProperty()
  rua: string;

  @Column()
  @ApiProperty()
  numero: number;

  @Column()
  @ApiProperty()
  complemento?: string;

  @Column()
  @ApiProperty()
  bairro: string;

  @Column()
  @ApiProperty()
  cidade: string;

  @Column()
  @ApiProperty()
  estado: string;

  @Column()
  user_id: number;
}
