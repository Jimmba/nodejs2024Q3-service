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

import { UserEntity } from './modules/users/entities';

config();

const {
  POSTGRES_PORT,
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
  POSTGRES_DB: database,
  IS_DEV,
} = process.env;

const port = IS_DEV ? parseInt(POSTGRES_PORT) : 5432;
const host = IS_DEV ? 'localhost' : 'postgres';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [UserEntity],
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
