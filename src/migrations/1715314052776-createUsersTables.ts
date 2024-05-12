import { MigrationInterface, QueryRunner, Table } from 'typeorm';
console.log('\n\n\n Inicio da execução da Migration CreateUsersTable1657222882811');

export class CreateUsersTable1715314052776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const exists = await queryRunner.hasTable(
      new Table({
        name: 'tb_users',
      }),
    );

    if (exists) return;

    await queryRunner.createTable(
      new Table({
        name: 'tb_users',
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
            name: 'name',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar(255)',
            isNullable: false,
            comment: 'Regra do tipo de usuário do sistema',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
            isNullable: true,
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

    await queryRunner.query(`ALTER TABLE public.tb_users ALTER COLUMN "role" SET DEFAULT 'USER';`);

    console.log('Fim da execução da Migration CreateUsersTable1657222882811');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_users');
  }
}
