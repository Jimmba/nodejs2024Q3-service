import { Injectable } from '@nestjs/common';

import { NotFoundException } from '../../../common/exceptions';
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
    const { albumId, artistId } = body;
    await this.database.validateAlbum(albumId);
    await this.database.validateArtist(artistId);
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