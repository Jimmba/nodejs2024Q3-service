import { Injectable } from '@nestjs/common';
import { ArtistEntity, UserEntity } from './entities';
import { IArtist } from '../artists/interfaces';
import { CreateArtistDto } from '../artists/dtos';
import { IUser } from '../users/interfaces';
import { CreateUserDto } from '../users/dtos';

@Injectable()
export class Database {
  private readonly users: UserEntity;
  private readonly artists: ArtistEntity;

  constructor() {
    this.users = new UserEntity();
    this.artists = new ArtistEntity();
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
    return this.artists.deleteArtist(id);
  }
}
