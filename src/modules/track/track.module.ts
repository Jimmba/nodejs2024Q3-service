import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackController } from './controllers';

import { AlbumModule } from '../album';
import { ArtistModule } from '../artists';
import { TrackEntity } from './entities';
import { TrackService } from './services';

@Module({
  imports: [ArtistModule, AlbumModule, TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
