import { MigrationInterface, QueryRunner } from 'typeorm';

export class Favorites1731946669293 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "favs" (
          "id" character varying NOT NULL,
          "artistId" character varying,
          "albumId" character varying,
          "trackId" character varying,
          CONSTRAINT "PK_favs" PRIMARY KEY ("id"),
          CONSTRAINT "FK_fav_artist" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON UPDATE CASCADE ON DELETE SET NULL,
          CONSTRAINT "FK_fav_album" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON UPDATE CASCADE ON DELETE SET NULL,
          CONSTRAINT "FK_fav_track" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON UPDATE CASCADE ON DELETE SET NULL
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favs"`);
  }
}
