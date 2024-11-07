import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AlbumModule, ArtistModule, TrackModule, UserModule } from './modules';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
