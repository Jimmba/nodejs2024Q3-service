import { Injectable } from '@nestjs/common';

import { BadRequestException } from '../../common/exceptions';

import {
  ArtistEntity,
  AlbumEntity,
  UserEntity,
  TrackEntity,
  FavoriteEntity,
} from '../entities';

import { CreateAlbumDto } from '../../modules/album/dtos';
import { CreateArtistDto } from '../../modules/artists/dtos';
import { CreateTrackDto } from '../../modules/track/dtos';
import { CreateUserDto } from '../../modules/users/dtos';

import { IAlbum } from '../../modules/album/interfaces';
import { IArtist } from '../../modules/artists/interfaces';
import { IFavorites } from '../../modules/favorites/interfaces';
import { ITrack } from '../../modules/track/interfaces';
import { IUser } from '../../modules/users/interfaces';

@Injectable()
export class DatabaseService {
  private readonly albums: AlbumEntity;
  private readonly artists: ArtistEntity;
  private readonly favorites: FavoriteEntity;
  private readonly tracks: TrackEntity;
  private readonly users: UserEntity;

  constructor() {
    this.albums = new AlbumEntity();
    this.artists = new ArtistEntity();
    this.favorites = new FavoriteEntity();
    this.tracks = new TrackEntity();
    this.users = new UserEntity();
  }

  public async getUsers(): Promise<IUser[]> {
    return this.users.getUsers();
  }

  public async getUserById(id: string): Promise<IUser> {
    return this.users.getUserById(id);
  }

  public async getUserByLogin(login: string): Promise<IUser> {
    return this.users.getUserByLogin(login);
  }

  public async createUser(createUser: CreateUserDto): Promise<IUser> {
    return this.users.createUser(createUser);
  }

  public async updatePassword(id: string, newPassword: string): Promise<IUser> {
    return this.users.updatePassword(id, newPassword);
  }

  public async deleteUser(id: string): Promise<void> {
    return this.users.deleteUser(id);
  }

  public async validateArtist(artistId: string | null): Promise<IArtist> {
    if (artistId === null) return;
    const artist = await this.getArtistById(artistId);
    if (!artist) {
      throw new BadRequestException(`Artist '${artistId}' does not exist`);
    }
    return artist;
  }

  public async getArtists(): Promise<IArtist[]> {
    return this.artists.getArtists();
  }

  public async getArtistById(id: string): Promise<IArtist> {
    return this.artists.getArtistById(id);
  }

  public async createArtist(createArtist: CreateArtistDto): Promise<IArtist> {
    return this.artists.createArtist(createArtist);
  }

  public async updateArtist(
    id: string,
    updateArtist: CreateArtistDto,
  ): Promise<IArtist> {
    return this.artists.updateArtist(id, updateArtist);
  }

  public async deleteArtist(id: string): Promise<void> {
    await Promise.all([
      this.tracks.removeArtistsTracks(id),
      this.albums.removeArtistsAlbums(id),
      this.favorites.deleteArtistFromFavorites(id),
    ]);
    return this.artists.deleteArtist(id);
  }

  public async validateAlbum(albumId: string | null): Promise<IAlbum> {
    if (albumId === null) return;
    const album = await this.getAlbumById(albumId);
    if (!album) {
      throw new BadRequestException(`Album '${albumId}' does not exist`);
    }
    return album;
  }

  public async getAlbums(): Promise<IAlbum[]> {
    return this.albums.getAlbums();
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    return this.albums.getAlbumById(id);
  }

  public async createAlbum(createAlbum: CreateAlbumDto): Promise<IAlbum> {
    return this.albums.createAlbum(createAlbum);
  }

  public async updateAlbum(
    id: string,
    updateAlbum: CreateAlbumDto,
  ): Promise<IAlbum> {
    return this.albums.updateAlbum(id, updateAlbum);
  }

  public async deleteAlbum(id: string): Promise<void> {
    await Promise.all([
      this.tracks.removeAlbumsTracks(id),
      this.favorites.deleteAlbumFromFavorites(id),
    ]);
    return this.albums.deleteAlbum(id);
  }

  public async getTracks(): Promise<ITrack[]> {
    return this.tracks.getTracks();
  }

  public async getTrackById(id: string): Promise<ITrack> {
    return this.tracks.getTrackById(id);
  }

  public async createTrack(createTrack: CreateTrackDto): Promise<ITrack> {
    return this.tracks.createTrack(createTrack);
  }

  public async updateTrack(
    id: string,
    updateTrack: CreateTrackDto,
  ): Promise<ITrack> {
    return this.tracks.updateTrack(id, updateTrack);
  }

  public async deleteTrack(id: string): Promise<void> {
    await this.favorites.deleteTrackFromFavorites(id);
    return this.tracks.deleteTrack(id);
  }

  public async getAllFavorites(): Promise<IFavorites> {
    return this.favorites.getAllFavorites();
  }

  async addAlbumToFavorites(album: IAlbum): Promise<void> {
    return this.favorites.addAlbumToFavorites(album);
  }

  async albumIsExistInFavorites(id: string): Promise<boolean> {
    return this.favorites.albumIsExistInFavorites(id);
  }

  async deleteAlbumFromFavorites(id: string): Promise<void> {
    return this.favorites.deleteAlbumFromFavorites(id);
  }

  async addArtistToFavorites(artist: IArtist): Promise<void> {
    return this.favorites.addArtistToFavorites(artist);
  }

  async artistIsExistInFavorites(id: string): Promise<boolean> {
    return this.favorites.artistIsExistInFavorites(id);
  }

  async deleteArtistFromFavorites(id: string): Promise<void> {
    return this.favorites.deleteArtistFromFavorites(id);
  }

  async addTrackToFavorites(track: ITrack): Promise<void> {
    return this.favorites.addTrackToFavorites(track);
  }

  async trackIsExistInFavorites(id: string): Promise<boolean> {
    return this.favorites.trackIsExistInFavorites(id);
  }

  async deleteTrackFromFavorites(id: string): Promise<void> {
    return this.favorites.deleteTrackFromFavorites(id);
  }
}
