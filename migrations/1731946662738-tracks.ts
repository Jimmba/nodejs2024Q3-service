import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tracks1731946662738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tracks" (
        "id" character varying NOT NULL,
        "name" character varying NOT NULL,
        "artistId" character varying,
        "albumId" character varying,
        "duration" integer NOT NULL,
        CONSTRAINT "PK_tracks" PRIMARY KEY ("id"),
        CONSTRAINT "FK_track_artist" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON UPDATE CASCADE ON DELETE SET NULL,
        CONSTRAINT "FK_track_album" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON UPDATE CASCADE ON DELETE SET NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tracks"`);
  }
}
