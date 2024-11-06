import { IsDefined, IsNumber, IsString, IsUUID } from 'class-validator';
import { IUser } from '../interfaces';

export class UserDto implements IUser {
  @IsUUID()
  @IsDefined()
  id: string;

  @IsString()
  @IsDefined()
  login: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsNumber()
  @IsDefined()
  version: number; // integer number, increments on update

  @IsNumber()
  @IsDefined()
  createdAt: number; // timestamp of creation

  @IsNumber()
  @IsDefined()
  updatedAt: number; // timestamp of last update
}
