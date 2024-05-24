import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenerateUniqueKeyTrigger1716418879685
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the function to generate unique keys
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION generate_unique_key() RETURNS TRIGGER AS $$
      DECLARE
        prefixo_consulta varchar(255);
        sufixo varchar(8);
        chave_unica varchar(255);
      BEGIN
        -- Recupera o Prefixo da Consulta de acordo com o id_tipo_consulta.
        SELECT t.prefixo_consulta INTO prefixo_consulta
        FROM tb_tipo_consulta t
        WHERE t.id = NEW.id_tipo_consulta;

        -- Gera o Sufixo, utilizando o hash MD5
        LOOP
          sufixo := UPPER(SUBSTRING(md5(random()::text), 1, 8));
          chave_unica := prefixo_consulta || '-' || sufixo;
          -- Garante que a chave seja unica.
          EXIT WHEN NOT EXISTS (
            SELECT 1 FROM tb_historico_consulta WHERE chave = chave_unica
          );
        END LOOP;

        -- Altera o valor da chave para a chave gerada.
        NEW.chave = chave_unica;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Cria a Trigger para chamar a função.
    await queryRunner.query(`
      CREATE TRIGGER trg_generate_unique_key
      BEFORE INSERT ON tb_historico_consulta
      FOR EACH ROW
      EXECUTE FUNCTION generate_unique_key();
    `);

    console.log('Trigger trg_generate_unique_key criada com sucesso!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trg_generate_unique_key ON tb_historico_consulta`,
    );
    await queryRunner.query(`DROP FUNCTION IF EXISTS generate_unique_key`);
  }
}
