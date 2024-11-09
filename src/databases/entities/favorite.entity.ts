import { CreateAlbumDto } from '../../modules/album/dtos';
import { CreateArtistDto } from '../../modules/artists/dtos';
import { CreateTrackDto } from '../../modules/track/dtos';

import { IAlbum } from '../../modules/album/interfaces';
import { IArtist } from '../../modules/artists/interfaces';
import { IFavorites } from '../../modules/favorites/interfaces';
import { ITrack } from '../../modules/track/interfaces';

export class FavoriteEntity {
  private readonly albums: IAlbum[] = [];
  private readonly artists: IArtist[] = [];
  private readonly tracks: ITrack[] = [];

  async getAllFavorites(): Promise<IFavorites> {
    return {
      albums: this.albums,
      artists: this.artists,
      tracks: this.tracks,
    };
  }
  async addAlbumToFavorites(album: IAlbum): Promise<void> {
    const { id } = album;
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex !== -1) return;
    this.albums.push(album);
  }

  async albumIsExistInFavorites(id: string): Promise<boolean> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    return albumIndex !== -1;
  }

  async updateAlbum(id: string, updateAlbum: CreateAlbumDto): Promise<void> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    const album = {
      id,
      ...updateAlbum,
    };
    this.albums[albumIndex] = album;
  }

  async deleteAlbumFromFavorites(id: string): Promise<void> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(albumIndex, 1);
  }

  async addArtistToFavorites(artist: IArtist): Promise<void> {
    const { id } = artist;
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex !== -1) return;
    this.artists.push(artist);
  }

  async artistIsExistInFavorites(id: string): Promise<boolean> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    return artistIndex !== -1;
  }

  async updateArtist(id: string, updateArtist: CreateArtistDto): Promise<void> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    const artist = {
      id,
      ...updateArtist,
    };
    this.artists[artistIndex] = artist;
  }

  async deleteArtistFromFavorites(id: string): Promise<void> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(artistIndex, 1);
  }

  async addTrackToFavorites(track: ITrack): Promise<void> {
    const { id } = track;
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex !== -1) return;
    this.tracks.push(track);
  }

  async trackIsExistInFavorites(id: string): Promise<boolean> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    return trackIndex !== -1;
  }

  async updateTrack(id: string, updateTrack: CreateTrackDto): Promise<void> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    const track = {
      id,
      ...updateTrack,
    };
    this.tracks[trackIndex] = track;
  }

  async deleteTrackFromFavorites(id: string): Promise<void> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(trackIndex, 1);
  }
}
