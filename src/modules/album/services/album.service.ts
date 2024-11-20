import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  NotFoundException,
} from '../../../common/exceptions';
import { generateUuid } from '../../../common/helpers';

import { CreateAlbumDto } from '../dtos';
import { AlbumEntity } from '../entities';
import { IAlbum } from '../interfaces';
import { ArtistService } from '../../../modules/artists/services';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @Inject(ArtistService)
    private readonly artistService: ArtistService,
  ) {}

  private async validateAlbum(id: string) {
    if (id === null) return;
    return await this.getAlbumByIdOrThrow(id);
  }

  public async validateIds(albumId: string, artistId: string): Promise<void> {
    const album = await this.validateAlbum(albumId);
    const artist = await this.artistService.validateArtist(artistId);
    if (album && artist && album.artistId !== artist.id)
      throw new BadRequestException(
        `Passed album id does not belong to passed artist`,
      );
  }

  public async getAlbums(): Promise<IAlbum[]> {
    return this.albumRepository.find();
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    return await this.albumRepository.findOneBy({ id });
  }

  public async getAlbumByIdOrThrow(id: string): Promise<IAlbum> {
    const album = await this.getAlbumById(id);
    if (!album) throw new NotFoundException(`Album '${id}' not found`);
    return album;
  }

  public async createAlbum(createAlbum: CreateAlbumDto): Promise<IAlbum> {
    const { artistId } = createAlbum;
    await this.artistService.validateArtist(artistId);
    const album: IAlbum = {
      id: generateUuid(),
      ...createAlbum,
    };
    const newAlbum = this.albumRepository.create(album);
    await this.albumRepository.save(newAlbum);
    return album;
  }

  public async updateAlbum(
    id: string,
    updateAlbum: CreateAlbumDto,
  ): Promise<IAlbum> {
    await this.getAlbumByIdOrThrow(id);
    const { artistId } = updateAlbum;
    await this.artistService.validateArtist(artistId);
    await this.albumRepository.update(id, {
      id,
      ...updateAlbum,
    });
    return this.getAlbumByIdOrThrow(id);
  }

  public async deleteAlbum(id: string): Promise<void> {
    await this.getAlbumByIdOrThrow(id);
    await this.albumRepository.delete(id);
  }
}
