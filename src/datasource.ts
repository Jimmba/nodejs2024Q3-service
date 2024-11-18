import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { AlbumEntity } from './modules/album/entities';
import { ArtistEntity } from './modules/artists/entities';
import { TrackEntity } from './modules/track/entities';
import { UserEntity } from './modules/users/entities';
import { FavoritesEntity } from './modules/favorites/entities';
import {
  Artists1731945444100,
  Albums1731946415573,
  Favorites1731946669293,
  Tracks1731946662738,
  Users1731944249813,
} from '../migrations';

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

export const dataSourceOptions: DataSourceOptions = {
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
  migrations: [
    Artists1731945444100,
    Albums1731946415573,
    Favorites1731946669293,
    Tracks1731946662738,
    Users1731944249813,
  ],
  migrationsTableName: 'migrations_table',
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
