import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTriggerRestrictTipoConsultaInsert1716428181342
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION restrict_tipo_consulta_insert() RETURNS TRIGGER AS $$
      BEGIN
        -- Verifica se o usuário que está realizando a inserção é um superadministrador
        IF (SELECT role FROM tb_users WHERE id = NEW.criado_por) != 'SUPERADMIN' THEN
          RAISE EXCEPTION 'Acesso negado! Somente usuários com a role SUPERADMIN podem criar registros.';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      CREATE TRIGGER trigger_restrict_tipo_consulta_insert
      BEFORE INSERT ON tb_tipo_consulta
      FOR EACH ROW
      EXECUTE FUNCTION restrict_tipo_consulta_insert();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_restrict_tipo_consulta_insert ON tb_tipo_consulta;`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS restrict_tipo_consulta_insert;`,
    );
  }
}
