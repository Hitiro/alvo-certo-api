import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTriggerRestrictTipoConsultaUpdate1716426147368
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remover a trigger existente, se ela já existir
    await queryRunner.query(
      'DROP TRIGGER IF EXISTS restrict_tipo_consulta_update ON tb_tipo_consulta;',
    );
    await queryRunner.query(
      'DROP FUNCTION IF EXISTS restrict_tipo_consulta_update;',
    );

    // Desativar a trigger existente
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION restrict_tipo_consulta_update() RETURNS TRIGGER AS $$
      DECLARE
          user_role TEXT;
      BEGIN
          -- Obtém a role do usuário autenticado com base no ID passado como parâmetro
          SELECT role INTO user_role FROM tb_users WHERE id = NEW.atualizado_por;

          -- Verifica se a role é 'SUPERADMIN', caso contrário, lança uma exceção
          IF user_role != 'SUPERADMIN' THEN
              RAISE EXCEPTION 'Acesso negado! Somente usuários SUPERADMIN podem editar tipos de consulta.';
          END IF;

          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER restrict_tipo_consulta_update BEFORE UPDATE ON tb_tipo_consulta
      FOR EACH ROW EXECUTE PROCEDURE restrict_tipo_consulta_update();
    `);

    console.log(
      'Trigger restrict_tipo_consulta_update atualizada com sucesso!',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a nova trigger
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS restrict_tipo_consulta_update ON tb_tipo_consulta`,
    );
  }
}
