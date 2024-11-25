import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { generateUuid } from '../../../common/helpers';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '../../../common/exceptions';
import { ICreateFavorite, IFavorites } from '../interfaces';

import { ArtistService } from '../../../modules/artists/services';
import { AlbumService } from '../../../modules/album/services';
import { TrackService } from '../../../modules/track/services';

import { FavoritesEntity } from '../entities';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject(ArtistService)
    private readonly artistService: ArtistService,
    @Inject(AlbumService)
    private readonly albumService: AlbumService,
    @Inject(TrackService)
    private readonly trackService: TrackService,
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  private createFavoritesEntity(options: ICreateFavorite): FavoritesEntity {
    const { albumId, artistId, trackId } = options;
    return this.favoritesRepository.create({
      id: generateUuid(),
      albumId: albumId || null,
      artistId: artistId || null,
      trackId: trackId || null,
    });
  }

  public async getAllFavorites(): Promise<IFavorites> {
    const favorites = await this.favoritesRepository.find({
      relations: ['artist', 'album', 'track'],
    });

    return {
      artists: favorites.filter((fav) => fav.artist).map((fav) => fav.artist),
      albums: favorites.filter((fav) => fav.album).map((fav) => fav.album),
      tracks: favorites.filter((fav) => fav.track).map((fav) => fav.track),
    };
  }

  public async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.albumService.getAlbumById(albumId);
    if (!album)
      throw new UnprocessableEntityException(`Album '${albumId}' not found`);
    await this.favoritesRepository.save(
      this.createFavoritesEntity({ albumId }),
    );
  }

  public async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { albumId },
    });
    if (!favorite) {
      throw new NotFoundException(`Album '${albumId}' not found`);
    }
    await this.favoritesRepository.remove(favorite);
  }

  public async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.artistService.getArtistById(artistId);
    if (!artist)
      throw new UnprocessableEntityException(`Artist '${artistId}' not found`);
    await this.favoritesRepository.save(
      this.createFavoritesEntity({ artistId }),
    );
  }

  public async deleteArtistFromFavorites(artistId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { artistId },
    });
    if (!favorite) {
      throw new NotFoundException(`Artist '${artistId}' not found`);
    }
    await this.favoritesRepository.remove(favorite);
  }

  public async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.trackService.getTrackById(trackId);
    if (!track)
      throw new UnprocessableEntityException(`Track '${trackId}' not found`);
    await this.favoritesRepository.save(
      this.createFavoritesEntity({ trackId }),
    );
  }

  public async deleteTrackFromFavorites(trackId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { trackId },
    });
    if (!favorite) {
      throw new NotFoundException(`Track '${trackId}' not found`);
    }
    await this.favoritesRepository.remove(favorite);
  }
}
