import { Inject, Injectable } from '@nestjs/common';

import {
  NotFoundException,
  UnprocessableEntityException,
} from '../../../common/exceptions';
import { IFavorites } from '../interfaces';
import { ArtistService } from 'src/modules/artists/services';
import { AlbumService } from 'src/modules/album/services';
import { TrackService } from 'src/modules/track/services';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesEntity } from '../entities';
import { Repository } from 'typeorm';
import { generateUuid } from 'src/common/helpers';

interface ICreateFavorite {
  //! replace
  albumId?: string;
  artistId?: string;
  trackId?: string;
}
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
    console.log(favorites);

    return {
      artists: favorites.filter((fav) => fav.artist).map((fav) => fav.artist),
      albums: favorites.filter((fav) => fav.album).map((fav) => fav.album),
      tracks: favorites.filter((fav) => fav.track).map((fav) => fav.track),
    };
  }

  public async addAlbumToFavorites(albumId: string): Promise<void> {
    let album;
    try {
      album = await this.albumService.getAlbumById(albumId); //! returns bad request. Check others;
    } catch (e) {
      album = null;
    }

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
    let artist;
    try {
      artist = await this.artistService.getArtistById(artistId); //! returns bad request. Check others;
    } catch (e) {
      artist = null;
    }

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
    let track;
    try {
      track = await this.trackService.getTrackById(trackId); //! returns bad request. Check others;
    } catch (e) {
      track = null;
    }
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
