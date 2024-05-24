import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIpOrigemToHistoricoConsulta1716286092747
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('tb_historico_consulta');
    if (!hasTable) return;

    const hasColumn = await queryRunner.hasColumn(
      'tb_historico_consulta',
      'ip_origem',
    );
    if (!hasColumn) {
      await queryRunner.addColumn(
        'tb_historico_consulta',
        new TableColumn({
          name: 'ip_origem',
          type: 'varchar',
          length: '50',
          isNullable: true,
        }),
      );
      console.log(
        'Coluna ip_origem adicionada com sucesso à tabela tb_historico_consulta!',
      );

      await queryRunner.query(
        `update tb_historico_consulta set ip_origem = '::1' where ip_origem is null`,
      );
      await queryRunner.query(
        `ALTER TABLE tb_historico_consulta ALTER COLUMN ip_origem SET NOT NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE tb_historico_consulta ALTER COLUMN custo SET NOT NULL`,
      );
    } else {
      console.log(
        'A coluna ip_origem já existe na tabela tb_historico_consulta!',
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_historico_consulta', 'ip_origem');
  }
}
