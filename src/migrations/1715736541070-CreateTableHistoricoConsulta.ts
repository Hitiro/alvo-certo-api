import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateHistoricoConsultaTable1715314052911
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const exists = await queryRunner.hasTable(
      new Table({
        name: 'tb_historico_consulta',
      }),
    );

    if (exists) return;

    await queryRunner.createTable(
      new Table({
        name: 'tb_historico_consulta',
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
            name: 'id_tipo_consulta',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'chave',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'conjunto_dados',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'custo',
            type: 'int',
            isNullable: true,
            default: 0,
          },
          {
            name: 'consultado_por',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_historico_consulta',
      new TableForeignKey({
        name: 'tb_historico_consulta_user_id',
        columnNames: ['consultado_por'],
        referencedTableName: 'tb_users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_historico_consulta',
      new TableForeignKey({
        name: 'tb_historico_consulta_tipo',
        columnNames: ['id_tipo_consulta'],
        referencedTableName: 'tb_tipo_consulta',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    console.log('Tabela tb_historico_consulta criada com sucesso!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_historico_consulta');
  }
}
