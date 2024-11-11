import { Injectable } from '@nestjs/common';

import { NotFoundException } from '../../../common/exceptions';
import { DatabaseService } from '../../../databases';

import { CreateArtistDto } from '../dtos';
import { IArtist } from '../interfaces';

@Injectable()
export class ArtistService {
  constructor(private readonly database: DatabaseService) {}

  public async getArtists(): Promise<IArtist[]> {
    return this.database.getArtists();
  }

  public async getArtistById(id: string): Promise<IArtist> {
    const artist = await this.database.getArtistById(id);
    if (!artist) throw new NotFoundException(`Artist '${id}' not found`);
    return artist;
  }

  public async createArtist(createArtist: CreateArtistDto): Promise<IArtist> {
    return this.database.createArtist(createArtist);
  }

  public async updateArtist(
    id: string,
    updateArtist: CreateArtistDto,
  ): Promise<IArtist> {
    await this.getArtistById(id);
    return this.database.updateArtist(id, updateArtist);
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.getArtistById(id);
    return this.database.deleteArtist(id);
  }
}
