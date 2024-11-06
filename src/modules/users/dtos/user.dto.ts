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
  version: number;

  @IsNumber()
  @IsDefined()
  createdAt: number;

  @IsNumber()
  @IsDefined()
  updatedAt: number;
}
