import { generateUuid } from '../../common/helpers';

import { CreateAlbumDto } from '../../modules/album/dtos';
import { IAlbum } from '../../modules/album/interfaces';

export class AlbumEntity {
  private readonly albums: IAlbum[] = [];

  public async getAlbums(): Promise<IAlbum[]> {
    return this.albums;
  }

  public async removeArtistsAlbums(id: string): Promise<void> {
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    const [album] = this.albums.filter((album) => {
      const { id: albumId } = album;
      return id === albumId;
    });
    if (!album) return null;
    return album;
  }

  public async createAlbum(createAlbum: CreateAlbumDto): Promise<IAlbum> {
    const album: IAlbum = {
      id: generateUuid(),
      ...createAlbum,
    };
    this.albums.push(album);
    return album;
  }

  public async updateAlbum(
    id: string,
    updateAlbum: CreateAlbumDto,
  ): Promise<IAlbum> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    const album: IAlbum = {
      id,
      ...updateAlbum,
    };
    this.albums[albumIndex] = album;
    return album;
  }

  public async deleteAlbum(id: string): Promise<void> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(albumIndex);
  }
}
