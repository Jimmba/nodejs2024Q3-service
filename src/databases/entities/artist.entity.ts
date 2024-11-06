import { CreateArtistDto } from '../../artists/dtos';
import { IArtist } from '../../artists/interfaces';
import { generateUuid } from '../../common';

export class ArtistEntity {
  private readonly artists: IArtist[] = [];

  public async getArtists(): Promise<IArtist[]> {
    return this.artists;
  }

  public async getArtistById(id: string): Promise<IArtist> {
    const [artist] = this.artists.filter((artist) => {
      const { id: artistId } = artist;
      return id === artistId;
    });
    if (!artist) return null;
    return artist;
  }

  public async createArtist(createArtist: CreateArtistDto): Promise<IArtist> {
    const artist: IArtist = {
      id: generateUuid(),
      ...createArtist,
    };
    this.artists.push(artist);
    return artist;
  }

  public async updateArtist(
    id: string,
    updateArtist: CreateArtistDto,
  ): Promise<IArtist> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    const { grammy, name } = updateArtist;
    const artist = this.artists[artistIndex];
    artist.grammy = grammy;
    artist.name = name;
    const updatedArtist = await this.getArtistById(id);
    return updatedArtist;
  }

  public async deleteArtist(id: string): Promise<void> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(artistIndex);
  }
}
