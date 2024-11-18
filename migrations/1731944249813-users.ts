import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1731944249813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" character varying NOT NULL,
        "login" character varying NOT NULL,
        "password" character varying NOT NULL,
        "version" integer NOT NULL,
        "createdAt" bigint NOT NULL,
        "updatedAt" bigint NOT NULL,
        CONSTRAINT "PK_8d1c1c7f607f5f9bb40d8e071fc" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
