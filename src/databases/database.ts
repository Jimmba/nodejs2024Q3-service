import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../users';
import { UserEntity } from './entities';

@Injectable()
export class Database {
  users: UserEntity;

  constructor() {
    this.users = new UserEntity();
  }

  getUsers(): Promise<UserResponseDto[]> {
    return this.users.getUsers();
  }
}
