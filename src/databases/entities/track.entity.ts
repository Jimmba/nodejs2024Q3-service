import { generateUuid } from '../../common/helpers';

import { CreateTrackDto } from '../../modules/track/dtos';
import { ITrack } from '../../modules/track/interfaces';

export class TrackEntity {
  private readonly tracks: ITrack[] = [];

  public async getTracks(): Promise<ITrack[]> {
    return this.tracks;
  }

  public async removeArtistsTracks(id: string): Promise<void> {
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  public async removeAlbumsTracks(id: string): Promise<void> {
    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  public async getTrackById(id: string): Promise<ITrack> {
    //! refactor duplicate code
    const [track] = this.tracks.filter((track) => {
      const { id: trackId } = track;
      return id === trackId;
    });
    if (!track) return null;
    return track;
  }

  public async createTrack(createTrack: CreateTrackDto): Promise<ITrack> {
    const track: ITrack = {
      id: generateUuid(),
      ...createTrack,
    };
    this.tracks.push(track);
    return track;
  }

  public async updateTrack(
    id: string,
    updateTrack: CreateTrackDto,
  ): Promise<ITrack> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    const track: ITrack = {
      id,
      ...updateTrack,
    };
    this.tracks[trackIndex] = track;
    return track;
  }

  public async deleteTrack(id: string): Promise<void> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(trackIndex, 1);
  }
}
