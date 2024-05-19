import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class AddColumnObservacaoToExtratoUsuario1716139276063
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('tb_extrato_usuario');
    if (!hasTable) return;

    const hasColumn = await queryRunner.hasColumn(
      'tb_extrato_usuario',
      'observacao',
    );

    if (!hasColumn) {
      await queryRunner.addColumn(
        'tb_extrato_usuario',
        new TableColumn({
          name: 'observacao',
          type: 'varchar',
          length: '100',
          isNullable: true,
        }),
      );
      console.log(
        'Coluna observacao adicionada com sucesso à tabela tb_extrato_usuario!',
      );
    } else {
      console.log(
        'A coluna observacao já existe na tabela tb_extrato_usuario!',
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_extrato_usuario', 'observacao');
    console.log(
      'Coluna observacao removida com sucesso da tabela tb_extrato_usuario!',
    );
  }
}
