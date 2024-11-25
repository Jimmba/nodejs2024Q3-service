import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  BadRequestException,
  NotFoundException,
} from '../../../common/exceptions';

import { generateUuid } from '../../../common/helpers';
import { CreateUserDto, UpdatePasswordDto } from '../dtos';
import { UserEntity } from '../entities';
import { IUser, IUserResponse } from '../interfaces';

const getNumber = (value: string | number): number => {
  return typeof value === 'number' ? value : parseInt(value);
};
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private filteredUser(user: IUser): IUserResponse {
    const { password, createdAt, updatedAt, ...rest } = user;
    return {
      ...rest,
      createdAt: getNumber(createdAt),
      updatedAt: getNumber(updatedAt),
    };
  }

  public async getAllUsers(): Promise<IUserResponse[]> {
    const users = await this.userRepository.find();
    return users.map(this.filteredUser);
  }

  private async getFullUserById(id: string): Promise<IUser> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User '${id}' not found`);
    return user;
  }

  public async getUserById(id: string): Promise<IUserResponse> {
    const user = await this.getFullUserById(id);
    return this.filteredUser(user);
  }

  public async getUserByLogin(login: string): Promise<IUser> {
    return await this.userRepository.findOneBy({ login });
  }

  public async createUser(createUser: CreateUserDto): Promise<IUserResponse> {
    const { login, password } = createUser;
    const savedUser = await this.getUserByLogin(login);
    if (savedUser)
      throw new BadRequestException(`User '${login}' already exists`);

    const user: IUser = {
      id: generateUuid(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return this.filteredUser(user);
  }

  public async updatePassword(
    id: string,
    body: UpdatePasswordDto,
  ): Promise<IUserResponse> {
    const { password: savedPassword, version } = await this.getFullUserById(id);
    const { oldPassword, newPassword } = body;
    if (savedPassword !== oldPassword)
      throw new ForbiddenException(`Wrong password`);
    await this.userRepository.update(id, {
      password: newPassword,
      version: version + 1,
      updatedAt: new Date().getTime(),
    });
    const updatedUser = await this.getFullUserById(id);
    return this.filteredUser(updatedUser);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }
}
