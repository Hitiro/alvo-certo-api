import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTbPerfilUsuario1715314053032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const exists = await queryRunner.hasTable(
      new Table({
        name: 'tb_perfil_usuario',
      }),
    );

    if (exists) return;

    await queryRunner.createTable(
      new Table({
        name: 'tb_perfil_usuario',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'cpfcnpj',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'nome',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'sobrenome',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'rua',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'numero',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'complemento',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'cidade',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'estado',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp without time zone',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_perfil_usuario',
      new TableForeignKey({
        name: 'fk_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'tb_users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    console.log(
      'Fim da execução da Migration CreateTbPerfilUsuario1715314053032',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_perfil_usuario', 'fk_user_id');
    await queryRunner.dropTable('tb_perfil_usuario');
  }
}
