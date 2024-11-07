import { Injectable } from '@nestjs/common';

import { BadRequestException, NotFoundException } from '../../../common';
import { DatabaseService } from '../../../databases';
import { CreateTrackDto } from '../dtos';
import { ITrack } from '../interfaces';

@Injectable()
export class TrackService {
  constructor(private readonly database: DatabaseService) {}

  public async getTracks(): Promise<ITrack[]> {
    return this.database.getTracks();
  }

  public async getTrackById(id: string): Promise<ITrack> {
    const track = await this.database.getTrackById(id);
    if (!track) throw new NotFoundException(`Track '${id}' not found`);
    return track;
  }

  private async validateIds(body: CreateTrackDto) {
    const { artistId, albumId } = body;

    if (artistId !== null) {
      //! refactor duplicate code (this.database.validateArtist)
      const artist = await this.database.getArtistById(artistId);
      if (!artist)
        throw new BadRequestException(`Artist '${artistId}' not exists`);
    }

    if (albumId !== null) {
      //! refactor duplicate code (this.database.validateAlbum)
      const album = await this.database.getAlbumById(albumId);
      if (!album)
        throw new BadRequestException(`Album '${albumId}' not exists`);
    }
  }

  public async createTrack(createTrack: CreateTrackDto): Promise<ITrack> {
    await this.validateIds(createTrack);
    return this.database.createTrack(createTrack);
  }

  public async updateTrack(
    //! createOrUpdate method?
    id: string,
    updateTrack: CreateTrackDto,
  ): Promise<ITrack> {
    await this.getTrackById(id);
    await this.validateIds(updateTrack);
    return this.database.updateTrack(id, updateTrack);
  }

  public async deleteTrack(id: string): Promise<void> {
    await this.getTrackById(id);
    return this.database.deleteTrack(id);
  }
}
