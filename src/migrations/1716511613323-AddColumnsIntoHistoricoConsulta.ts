import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsIntoHistoricoConsulta1716511613323
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasColumnChave = await queryRunner.hasColumn(
      'tb_historico_consulta',
      'chave',
    );

    if (hasColumnChave) return;

    const hasColumnResultado = await queryRunner.hasColumn(
      'tb_historico_consulta',
      'resultado',
    );

    if (hasColumnResultado) return;

    const hasColumnTipoDado = await queryRunner.hasColumn(
      'tb_historico_consulta',
      'tipo_dado',
    );

    if (hasColumnTipoDado) return;

    await queryRunner.addColumns('tb_historico_consulta', [
      new TableColumn({
        name: 'tipo_dado',
        type: 'varchar',
        length: '100',
        isNullable: true,
        comment: 'Tipo de dado que foi pesquisado',
      }),
      new TableColumn({
        name: 'chave',
        type: 'varchar',
        length: '100',
        isNullable: true,
        comment: 'O que foi pesquisado',
      }),
      new TableColumn({
        name: 'resultado',
        type: 'varchar',
        length: '5000',
        isNullable: true,
        comment: 'Resultado da pesquisa',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasColumnChave = await queryRunner.hasColumn(
      'tb_historico_consulta',
      'chave',
    );

    if (!hasColumnChave) return;

    const hasColumnResultado = await queryRunner.hasColumn(
      'tb_historico_consulta',
      'resultado',
    );

    if (!hasColumnResultado) return;

    const hasColumnTipoDado = await queryRunner.hasColumn(
      'tb_historico_consulta',
      'tipo_dado',
    );

    if (!hasColumnTipoDado) return;

    await queryRunner.dropColumns('tb_historico_consulta', [
      'tipo_dado',
      'resultado',
      'chave',
    ]);
  }
}
