import { Injectable } from '@nestjs/common';
import { CreateUserDto, IUser } from '../users';
import { UserEntity } from './entities';

@Injectable()
export class Database {
  private readonly users: UserEntity;

  constructor() {
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
}
