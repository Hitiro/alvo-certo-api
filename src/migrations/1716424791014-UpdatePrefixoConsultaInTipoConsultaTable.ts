import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePrefixoConsultaInTipoConsultaTable1716424791014
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE tb_tipo_consulta DISABLE TRIGGER all;

    WITH tmp AS (
        SELECT id, prefixo_consulta, SUBSTRING(prefixo_consulta, 1, LENGTH(prefixo_consulta) - 1) AS newname
        FROM tb_tipo_consulta
        WHERE prefixo_consulta LIKE '%-'
    )

    UPDATE tb_tipo_consulta set prefixo_consulta = tmp.newname from tmp WHERE tb_tipo_consulta.id = tmp.id;
    
    ALTER TABLE tb_tipo_consulta ENABLE TRIGGER all;
`);

    console.log('Prefixo de consulta atualizado com sucesso!');
  }

  public async down(): Promise<void> {
    return;
  }
}
