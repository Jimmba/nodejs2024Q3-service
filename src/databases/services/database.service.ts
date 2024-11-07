import { Injectable } from '@nestjs/common';

import {
  ArtistEntity,
  AlbumEntity,
  UserEntity,
  TrackEntity,
} from '../entities';

import { CreateAlbumDto } from '../../modules/album/dtos';
import { CreateArtistDto } from '../../modules/artists/dtos';
import { CreateTrackDto } from '../../modules/track/dtos';
import { CreateUserDto } from '../../modules/users/dtos';

import { IAlbum } from '../../modules/album/interfaces';
import { IArtist } from '../../modules/artists/interfaces';
import { ITrack } from '../../modules/track/interfaces';
import { IUser } from '../../modules/users/interfaces';

@Injectable()
export class DatabaseService {
  private readonly albums: AlbumEntity;
  private readonly artists: ArtistEntity;
  private readonly tracks: TrackEntity;
  private readonly users: UserEntity;

  constructor() {
    this.albums = new AlbumEntity();
    this.artists = new ArtistEntity();
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
    await this.albums.removeArtistsAlbums(id);
    await this.tracks.removeArtistsTracks(id);
    return this.artists.deleteArtist(id);
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
    await this.tracks.removeAlbumsTracks(id);
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
    return this.tracks.deleteTrack(id);
  }
}
