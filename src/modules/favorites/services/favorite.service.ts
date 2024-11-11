import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../../databases';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '../../../common/exceptions';
import { IFavorites } from '../interfaces';

@Injectable()
export class FavoriteService {
  constructor(private readonly database: DatabaseService) {}

  public async getAllFavorites(): Promise<IFavorites> {
    return await this.database.getAllFavorites();
  }

  public async addAlbumToFavorites(id: string): Promise<void> {
    const album = await this.database.getAlbumById(id);
    if (!album)
      throw new UnprocessableEntityException(`Album '${id}' not found`);
    this.database.addAlbumToFavorites(album);
  }

  public async deleteAlbumFromFavorites(id: string): Promise<void> {
    const isExist = this.database.albumIsExistInFavorites(id);
    if (!isExist) throw new NotFoundException(`Album '${id}' not found`);
    this.database.deleteAlbumFromFavorites(id);
  }

  public async addArtistToFavorites(id: string): Promise<void> {
    const artist = await this.database.getArtistById(id);
    if (!artist)
      throw new UnprocessableEntityException(`Artist '${id}' not found`);
    this.database.addArtistToFavorites(artist);
  }

  public async deleteArtistFromFavorites(id: string): Promise<void> {
    const isExist = this.database.artistIsExistInFavorites(id);
    if (!isExist) throw new NotFoundException(`Artist '${id}' not found`);
    this.database.deleteArtistFromFavorites(id);
  }

  public async addTrackToFavorites(id: string): Promise<void> {
    const track = await this.database.getTrackById(id);
    if (!track)
      throw new UnprocessableEntityException(`Track '${id}' not found`);
    this.database.addTrackToFavorites(track);
  }

  public async deleteTrackFromFavorites(id: string): Promise<void> {
    const isExist = this.database.trackIsExistInFavorites(id);
    if (!isExist) throw new NotFoundException(`Track '${id}' not found`);
    this.database.deleteTrackFromFavorites(id);
  }
}
