import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TrackIdDto } from '../../../modules/track/dtos';
import { IFavorites } from '../interfaces';
import { FavoriteService } from '../services';
import { AuthGuard } from '../../auth/guards';
@UseGuards(AuthGuard)
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  getAllFavorites(): Promise<IFavorites> {
    return this.favoriteService.getAllFavorites();
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param() param: TrackIdDto): Promise<void> {
    const { id } = param;
    return this.favoriteService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param() param: TrackIdDto): Promise<void> {
    const { id } = param;
    return this.favoriteService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param() param: TrackIdDto): Promise<void> {
    const { id } = param;
    return this.favoriteService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(@Param() param: TrackIdDto): Promise<void> {
    const { id } = param;
    return this.favoriteService.deleteArtistFromFavorites(id);
  }

  @Post('track/:id')
  addTrackToFavorites(@Param() param: TrackIdDto): Promise<void> {
    const { id } = param;
    return this.favoriteService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(@Param() param: TrackIdDto): Promise<void> {
    const { id } = param;
    return this.favoriteService.deleteTrackFromFavorites(id);
  }
}
