import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AlbumModule, ArtistModule, UserModule } from './modules';
import { TrackModule } from './modules/track';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
