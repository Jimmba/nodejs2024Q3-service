import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggingInterceptor } from './common/interceptors';
import { FsModule, LoggingModule } from './common/services';

import { dataSourceOptions } from './datasource';

import {
  AlbumModule,
  ArtistModule,
  FavoriteModule,
  TrackModule,
  UserModule,
} from './modules';

@Module({
  imports: [
    LoggingModule,
    FsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AlbumModule,
    ArtistModule,
    FavoriteModule,
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, //! works or interceptor or tests
    },
  ],
})
export class AppModule {}
