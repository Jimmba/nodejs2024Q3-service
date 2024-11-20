import { MigrationInterface, QueryRunner } from 'typeorm';

export class Artists1731945444100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "artists" (
              "id" character varying NOT NULL,
              "grammy" boolean NOT NULL,
              "name" character varying NOT NULL,
              CONSTRAINT "PK_84f790c65bfcde236a3fbc7b9cb" PRIMARY KEY ("id")
            )
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artists"`);
  }
}
