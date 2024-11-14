import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundException } from '../../../common/exceptions';
import { generateUuid } from '../../../common/helpers';
import { CreateTrackDto } from '../dtos';
import { TrackEntity } from '../entities';
import { ITrack } from '../interfaces';
import { AlbumService } from '../../../modules/album/services';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,

    @Inject(AlbumService)
    private readonly albumService: AlbumService,
  ) {}

  public async getTracks(): Promise<ITrack[]> {
    return this.trackRepository.find();
  }

  public async getTrackById(id: string): Promise<ITrack> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new NotFoundException(`Track '${id}' not found`);
    return track;
  }

  public async createTrack(createTrack: CreateTrackDto): Promise<ITrack> {
    const { albumId, artistId } = createTrack;
    await this.albumService.validateIds(albumId, artistId);
    const track: ITrack = {
      id: generateUuid(),
      ...createTrack,
    };
    const newTrack = this.trackRepository.create(track);
    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  public async updateTrack(
    id: string,
    updateTrack: CreateTrackDto,
  ): Promise<ITrack> {
    await this.getTrackById(id);
    const { albumId, artistId } = updateTrack;
    await this.albumService.validateIds(albumId, artistId);
    await this.trackRepository.update(id, {
      id,
      ...updateTrack,
    });
    return this.getTrackById(id);
  }

  public async deleteTrack(id: string): Promise<void> {
    await this.getTrackById(id);
    await this.trackRepository.delete(id);
  }
}
