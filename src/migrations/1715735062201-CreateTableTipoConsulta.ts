import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTipoConsultaTable1715314052811
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const exists = await queryRunner.hasTable(
      new Table({
        name: 'tb_tipo_consulta',
      }),
    );

    if (exists) return;

    await queryRunner.createTable(
      new Table({
        name: 'tb_tipo_consulta',
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
            name: 'nome_consulta',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'prefixo_consulta',
            type: 'varchar(5)',
            isNullable: false,
          },
          {
            name: 'ativo',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'criado_por',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp without time zone',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_tipo_consulta',
      new TableForeignKey({
        name: 'fk_user_id',
        columnNames: ['criado_por'],
        referencedTableName: 'tb_users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Inserindo dados iniciais
    await queryRunner.query(
      `INSERT INTO tb_tipo_consulta (nome_consulta, prefixo_consulta, ativo, criado_por) VALUES
      ('Consultar Pessoas', 'PES-', true, 1),
      ('Consultar Empresas', 'EMP-', true, 1),
      ('Consultar Processos', 'PROC-', true, 1),
      ('Consultar Veículos', 'VEIC-', true, 1),
      ('Consultar Endereços', 'END-', true, 1);`,
    );

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION restrict_tipo_consulta_update() RETURNS TRIGGER AS $$
      BEGIN
        IF CURRENT_USER != (SELECT id FROM tb_users WHERE role = 'SUPERADMIN') THEN
          RAISE EXCEPTION 'Acesso negado! Somente usuários com role SUPERADMIN podem editar tipos de consulta.';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER restrict_tipo_consulta_update BEFORE UPDATE ON tb_tipo_consulta
      FOR EACH ROW EXECUTE PROCEDURE restrict_tipo_consulta_update();
    `);

    console.log('Tabela tb_tipo_consulta criada com sucesso!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE tb_tipo_consulta DISABLE TRIGGER ALL`);
    await queryRunner.dropTable('tb_tipo_consulta');
  }
}
