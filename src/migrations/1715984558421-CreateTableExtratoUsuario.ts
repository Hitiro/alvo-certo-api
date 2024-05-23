import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableExtratoUsuario1715984558421
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const exists = await queryRunner.hasTable(
      new Table({
        name: 'tb_extrato_usuario',
      }),
    );

    if (exists) return;

    await queryRunner.createTable(
      new Table({
        name: 'tb_extrato_usuario',
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
            name: 'data',
            type: 'timestamp without time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'id_historico_consulta',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ip_origem',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'valor',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'saldo',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'id_usuario',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_extrato_usuario',
      new TableForeignKey({
        name: 'tb_extrato_usuario_user_id',
        columnNames: ['id_usuario'],
        referencedTableName: 'tb_users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_extrato_usuario',
      new TableForeignKey({
        name: 'tb_extrato_consulta_tipo',
        columnNames: ['id_historico_consulta'],
        referencedTableName: 'tb_historico_consulta',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    console.log('Tabela tb_extrato_usuario criada com sucesso!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_extrato_usuario');
  }
}
