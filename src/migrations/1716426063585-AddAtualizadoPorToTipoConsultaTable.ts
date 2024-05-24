import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAtualizadoPorToTipoConsultaTable1716426063585
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_tipo_consulta',
      new TableColumn({
        name: 'atualizado_por',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION set_default_atualizado_por() RETURNS TRIGGER AS $$
      BEGIN
        NEW.atualizado_por = NEW.criado_por;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      CREATE TRIGGER trigger_set_default_atualizado_por
      BEFORE INSERT ON tb_tipo_consulta
      FOR EACH ROW
      EXECUTE FUNCTION set_default_atualizado_por();
    `);

    await queryRunner.query(
      `UPDATE tb_tipo_consulta SET atualizado_por = criado_por`,
    );

    await queryRunner.query(
      `ALTER TABLE tb_tipo_consulta ALTER COLUMN atualizado_por SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_tipo_consulta', 'atualizado_por');
  }
}
