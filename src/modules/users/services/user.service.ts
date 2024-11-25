import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { compare, genSalt, hash } from 'bcrypt';
import { config } from 'dotenv';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  NotFoundException,
} from '../../../common/exceptions';

import { generateUuid } from '../../../common/helpers';
import { CreateUserDto, UpdatePasswordDto } from '../dtos';
import { UserEntity } from '../entities';
import { IUser, IUserResponse } from '../interfaces';

config();

const { CRYPT_SALT } = process.env;

const cryptSalt = parseInt(CRYPT_SALT);

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

  private async hashString(value: string): Promise<string> {
    const salt = await genSalt(cryptSalt);
    return hash(value, salt);
  }

  public async createUser(createUser: CreateUserDto): Promise<IUserResponse> {
    const { login, password } = createUser;
    const savedUser = await this.getUserByLogin(login);
    if (savedUser)
      throw new BadRequestException(`User '${login}' already exists`);

    const hashedPassword = await this.hashString(password);
    const user: IUser = {
      id: generateUuid(),
      login,
      password: hashedPassword,
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
    const { password: savedHash, version } = await this.getFullUserById(id);
    const { oldPassword, newPassword } = body;

    const isCorrectPassword = await compare(oldPassword, savedHash);
    if (!isCorrectPassword) throw new ForbiddenException(`Wrong password`);

    const hashedPassword = await this.hashString(newPassword);

    await this.userRepository.update(id, {
      password: hashedPassword,
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
