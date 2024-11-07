import { generateUuid } from '../../common/helpers';

import { CreateUserDto } from '../../modules/users/dtos';
import { IUser } from '../../modules/users/interfaces';
export class UserEntity {
  private readonly users: IUser[] = [];

  public async getUsers(): Promise<IUser[]> {
    return this.users;
  }

  public async getUserById(id: string): Promise<IUser> {
    const [user] = this.users.filter((user) => {
      const { id: userId } = user;
      return id === userId;
    });
    if (!user) return null;
    return user;
  }

  public async getUserByLogin(login: string): Promise<IUser> {
    const [user] = this.users.filter((user) => {
      const { login: userLogin } = user;
      return login === userLogin;
    });
    if (!user) return null;
    return user;
  }

  public async createUser(createUser: CreateUserDto): Promise<IUser> {
    const { login, password } = createUser;
    const user: IUser = {
      id: generateUuid(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.users.push(user);
    return user;
  }

  public async updatePassword(id: string, newPassword: string): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const { login, version, createdAt } = this.users[userIndex];

    const user: IUser = {
      id,
      login,
      password: newPassword,
      version: version + 1,
      createdAt,
      updatedAt: new Date().getTime(),
    };
    this.users[userIndex] = user;
    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex);
  }
}
