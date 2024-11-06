import { Injectable } from '@nestjs/common';
import { Database } from '../../databases';
import { UserResponseDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(private readonly database: Database) {}

  getAllUsers(): Promise<UserResponseDto[]> {
    return this.database.getUsers();
  }
}
