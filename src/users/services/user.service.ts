import { ForbiddenException, Injectable } from '@nestjs/common';
import { Database } from '../../databases';
import { CreateUserDto, UpdatePasswordDto, UserResponseDto } from '../dtos';
import { BadRequestException, NotFoundException } from '../../common';
import { IUser } from '../interfaces';

@Injectable()
export class UserService {
  constructor(private readonly database: Database) {}

  private filteredUser(user: IUser): UserResponseDto {
    const { password, ...rest } = user;
    return { ...rest };
  }

  public async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.database.getUsers();
    return users.map(this.filteredUser);
  }

  private async getFullUserById(id: string): Promise<IUser> {
    const user = await this.database.getUserById(id);
    if (!user) throw new NotFoundException(`User '${id}' not found`);

    return user;
  }

  public async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.getFullUserById(id);
    return this.filteredUser(user);
  }

  public async createUser(createUser: CreateUserDto): Promise<UserResponseDto> {
    const { login } = createUser;
    const savedUser = await this.database.getUserByLogin(login);
    if (savedUser)
      throw new BadRequestException(`User '${login}' already exists`);

    const user = await this.database.createUser(createUser);
    return this.filteredUser(user);
  }

  public async updatePassword(
    id: string,
    body: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const savedUser = await this.getFullUserById(id);
    const { password: savedPassword } = savedUser;
    const { oldPassword, newPassword } = body;
    if (savedPassword !== oldPassword)
      throw new ForbiddenException(`Wrong password`);
    const updatedUser = await this.database.updatePassword(id, newPassword);
    return this.filteredUser(updatedUser);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    return this.database.deleteUser(id);
  }
}
