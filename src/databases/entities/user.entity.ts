import { IUser, UserResponseDto } from '../../users';
import { promisify } from '../helpers';

export class UserEntity {
  users: IUser[] = [];

  private filteredUser(user: IUser): UserResponseDto {
    const { password, ...rest } = user;
    return { ...rest };
  }

  getUsers(): Promise<UserResponseDto[]> {
    const users = this.users.map(this.filteredUser);
    return promisify(users);
  }
}
