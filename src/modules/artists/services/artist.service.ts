import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  NotFoundException,
} from '../../../common/exceptions';

import { CreateArtistDto } from '../dtos';
import { IArtist } from '../interfaces';
import { ArtistEntity } from '../entities';
import { generateUuid } from '../../../common/helpers';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  public async validateArtist(id: string) {
    if (id === null) return;
    const artist = await this.getArtistById(id);
    if (!artist) {
      throw new BadRequestException(`Artist '${id}' does not exist`);
    }
    return artist;
  }

  public async getArtists(): Promise<IArtist[]> {
    return this.artistRepository.find();
  }

  public async getArtistById(id: string): Promise<IArtist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException(`Artist '${id}' not found`);
    return artist;
  }

  public async createArtist(createArtist: CreateArtistDto): Promise<IArtist> {
    const { name, grammy } = createArtist;
    const artist = {
      id: generateUuid(),
      name,
      grammy,
    };
    const newArtist = this.artistRepository.create(artist);
    await this.artistRepository.save(newArtist);
    return artist;
  }

  public async updateArtist(
    id: string,
    updateArtist: CreateArtistDto,
  ): Promise<IArtist> {
    await this.getArtistById(id);
    await this.artistRepository.update(id, {
      id,
      ...updateArtist,
    });
    return this.getArtistById(id);
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.getArtistById(id);
    await this.artistRepository.delete(id);
  }
}
