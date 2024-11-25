import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tokens1732205201220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tokens" (
        "id" character varying NOT NULL,
        "userId" character varying NOT NULL,
        "refreshToken" TEXT NOT NULL,
        "createdAt" BIGINT NOT NULL,
        "updatedAt" BIGINT NOT NULL,
        CONSTRAINT "PK_a3b8b8e22e0e7c7a5b12e6e4e36" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_tokens" FOREIGN KEY ("userId") REFERENCES "users"("id") ON UPDATE CASCADE ON DELETE CASCADE
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS tokens;
    `);
  }
}
