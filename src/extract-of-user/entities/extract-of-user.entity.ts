import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_extrato_usuario')
export class ExtractOfUser {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  id_historico_consulta: number;

  @Column()
  @ApiProperty()
  ip_origem: string;

  @Column()
  @ApiProperty()
  valor: number;

  @Column()
  @ApiProperty()
  saldo: number;

  @Column()
  @ApiProperty()
  id_usuario: number;

  @Column()
  @ApiProperty()
  observacao: string;
}
