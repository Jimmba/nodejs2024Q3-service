import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AlbumModule, ArtistModule, UserModule } from './modules';

@Module({
  imports: [AlbumModule, ArtistModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
