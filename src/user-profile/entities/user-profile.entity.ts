import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

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

  @OneToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
