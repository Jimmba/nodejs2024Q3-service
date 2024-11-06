import { IUserResponse } from './user-response.interface';

export interface IUser extends IUserResponse {
  password: string;
}
