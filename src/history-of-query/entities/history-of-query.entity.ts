import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_historico_consulta')
export class HistoryOfQuery {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  id_tipo_consulta: number;

  @Column()
  @ApiProperty()
  codigo: string;

  @Column()
  @ApiProperty()
  conjunto_dados: string;

  @Column()
  @ApiProperty()
  custo: number;

  @Column()
  @ApiProperty()
  consultado_por: number;

  @Column()
  @ApiProperty()
  ip_origem: string;

  @Column()
  @ApiProperty()
  tipo_dado: string;

  @Column()
  @ApiProperty()
  chave: string;

  @Column()
  @ApiProperty()
  resultado: string;
}
