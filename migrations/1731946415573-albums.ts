import { MigrationInterface, QueryRunner } from 'typeorm';

export class Albums1731946415573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "albums" (
          "id" character varying NOT NULL,
          "name" character varying NOT NULL,
          "year" integer NOT NULL,
          "artistId" character varying,
          CONSTRAINT "PK_a3b8b8e22e0e7c7a5b12e6e4e35" PRIMARY KEY ("id"),
          CONSTRAINT "FK_artist_albums" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON UPDATE CASCADE ON DELETE SET NULL
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "albums"`);
  }
}
