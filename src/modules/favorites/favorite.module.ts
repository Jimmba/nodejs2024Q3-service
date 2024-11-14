import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteController } from './controllers';
import { FavoritesEntity } from './entities';
import { FavoriteService } from './services';
import { ArtistModule } from '../artists';
import { AlbumModule } from '../album';
import { TrackModule } from '../track';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
