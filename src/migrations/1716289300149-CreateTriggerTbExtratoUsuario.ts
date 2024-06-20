import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTriggerAfterInsertHistoricoConsulta1716289300149
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable(
      new Table({
        name: 'tb_extrato_usuario',
      }),
    );
    if (!hasTable) return;

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION after_insert_historico_consulta()
      RETURNS TRIGGER AS $$
      DECLARE
        ip_origem varchar(255);
        saldo_anterior int;
      BEGIN
        -- Obtendo o saldo anterior
        saldo_anterior := COALESCE(
          (SELECT saldo FROM tb_extrato_usuario WHERE id_usuario = NEW.consultado_por ORDER BY id DESC LIMIT 1),
          0
        );

        -- Insere um novo registro em tb_extrato_usuario
        INSERT INTO tb_extrato_usuario (
          id_historico_consulta,
          ip_origem,
          valor,
          saldo,
          id_usuario
        )
        VALUES (
          NEW.id,
          NEW.ip_origem,
          - NEW.custo,
          saldo_anterior - NEW.custo,
          NEW.consultado_por
        );

        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Criação do gatilho
    await queryRunner.query(`
      CREATE TRIGGER trg_after_insert_historico_consulta
      AFTER INSERT ON tb_historico_consulta
      FOR EACH ROW
      EXECUTE FUNCTION after_insert_historico_consulta();
    `);

    console.log(
      'Trigger trg_after_insert_historico_consulta criado com sucesso!',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trg_after_insert_historico_consulta ON tb_historico_consulta`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS after_insert_historico_consulta`,
    );
  }
}
