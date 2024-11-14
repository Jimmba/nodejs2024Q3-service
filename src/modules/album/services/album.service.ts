import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundException } from '../../../common/exceptions';
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

  public async getAlbums(): Promise<IAlbum[]> {
    return this.albumRepository.find();
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new NotFoundException(`Album '${id}' not found`);
    return album;
  }

  private async validateArtist(body: CreateAlbumDto) {
    const { artistId } = body;
    if (artistId === null) return;
    await this.artistService.getArtistById(artistId);
  }

  public async createAlbum(createAlbum: CreateAlbumDto): Promise<IAlbum> {
    await this.validateArtist(createAlbum);
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
    await this.getAlbumById(id);
    await this.validateArtist(updateAlbum);
    const res = await this.albumRepository.update(id, {
      id,
      ...updateAlbum,
    });
    return this.getAlbumById(id);
  }

  public async deleteAlbum(id: string): Promise<void> {
    await this.getAlbumById(id);
    await this.albumRepository.delete(id);
  }
}
