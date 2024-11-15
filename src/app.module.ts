import { config } from 'dotenv';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  AlbumModule,
  ArtistModule,
  FavoriteModule,
  TrackModule,
  UserModule,
} from './modules';

import { AlbumEntity } from './modules/album/entities';
import { ArtistEntity } from './modules/artists/entities';
import { TrackEntity } from './modules/track/entities';
import { UserEntity } from './modules/users/entities';
import { FavoritesEntity } from './modules/favorites/entities';

config();

const {
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
  POSTGRES_DB: database,
  IS_CONTAINER,
  POSTGRES_MOUNT_PORT,
  POSTGRES_DEFAULT_PORT,
} = process.env;

const port = IS_CONTAINER
  ? parseInt(POSTGRES_DEFAULT_PORT)
  : parseInt(POSTGRES_MOUNT_PORT);
const host = IS_CONTAINER ? 'postgres' : 'localhost';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [
        AlbumEntity,
        ArtistEntity,
        FavoritesEntity,
        TrackEntity,
        UserEntity,
      ],
      synchronize: true, //! remove?
    }),
    AlbumModule,
    ArtistModule,
    FavoriteModule,
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
