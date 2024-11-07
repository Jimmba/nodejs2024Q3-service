import { Injectable } from '@nestjs/common';

import { BadRequestException, NotFoundException } from '../../../common';
import { DatabaseService } from '../../../databases';

import { CreateAlbumDto } from '../dtos';
import { IAlbum } from '../interfaces';

@Injectable()
export class AlbumService {
  constructor(private readonly database: DatabaseService) {}

  public async getAlbums(): Promise<IAlbum[]> {
    return this.database.getAlbums();
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    const album = await this.database.getAlbumById(id);
    if (!album) throw new NotFoundException(`Album '${id}' not found`);
    return album;
  }

  private async validateArtist(body: CreateAlbumDto) {
    const { artistId } = body;
    if (artistId !== null) {
      const artist = await this.database.getArtistById(artistId);
      if (!artist)
        throw new BadRequestException(`Artist '${artistId}' not exists`);
    }
  }

  public async createAlbum(createAlbum: CreateAlbumDto): Promise<IAlbum> {
    await this.validateArtist(createAlbum);
    return this.database.createAlbum(createAlbum);
  }

  public async updateAlbum(
    id: string,
    updateAlbum: CreateAlbumDto,
  ): Promise<IAlbum> {
    await this.getAlbumById(id);
    await this.validateArtist(updateAlbum);
    return this.database.updateAlbum(id, updateAlbum);
  }

  public async deleteAlbum(id: string): Promise<void> {
    await this.getAlbumById(id);
    return this.database.deleteAlbum(id);
  }
}
