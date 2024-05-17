import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_tipo_consulta')
export class TypeOfQuery {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  nome_consulta: string;

  @Column()
  @ApiProperty()
  prefixo_consulta: string;

  @Column()
  @ApiProperty()
  ativo: boolean;

  @Column()
  @ApiProperty()
  criado_por: number;
}
