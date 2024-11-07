import { Injectable } from '@nestjs/common';

import { ArtistEntity, AlbumEntity, UserEntity } from '../entities';

import { CreateAlbumDto } from '../../modules/album/dtos';
import { CreateArtistDto } from '../../modules/artists/dtos';
import { CreateUserDto } from '../../modules/users/dtos';

import { IAlbum } from '../../modules/album/interfaces';
import { IArtist } from '../../modules/artists/interfaces';
import { IUser } from '../../modules/users/interfaces';

@Injectable()
export class DatabaseService {
  private readonly users: UserEntity;
  private readonly artists: ArtistEntity;
  private readonly albums: AlbumEntity;

  constructor() {
    this.users = new UserEntity();
    this.artists = new ArtistEntity();
    this.albums = new AlbumEntity();
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
    return this.albums.deleteAlbum(id);
  }
}
