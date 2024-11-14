import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumController } from './controllers';
import { AlbumEntity } from './entities';
import { AlbumService } from './services';
import { ArtistModule } from '../artists';

@Module({
  imports: [ArtistModule, TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
