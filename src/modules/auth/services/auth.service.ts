import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { config } from 'dotenv';

import { CreateUserDto } from '../../../modules/users/dtos';
import { UserService } from '../../../modules/users/services';
import { ForbiddenException } from 'src/common/exceptions';
import { sign, verify } from 'jsonwebtoken';
import { TokenEntity } from '../entities/auth.entity';
import { generateUuid } from 'src/common/helpers';
import { Repository } from 'typeorm';
import { IToken } from '../interfaces';

config();

interface IJwtPayload {
  userId: string;
  login: string;
}

const {
  CRYPT_SALT,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} = process.env;

const cryptSalt = parseInt(CRYPT_SALT);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  private async getPayload(token: string, key: string): Promise<IJwtPayload> {
    try {
      return verify(token, key) as IJwtPayload;
    } catch (e) {
      return null;
    }
  }

  async getValidRefreshTokenId(refreshToken: string): Promise<string | null> {
    let userId: string;

    const payload = await this.getPayload(refreshToken, JWT_SECRET_REFRESH_KEY);
    if (!payload) return null;

    userId = payload.userId;

    const tokens = await this.tokenRepository.find({
      where: { userId },
    });

    for (const token of tokens) {
      const { id, refreshToken: savedToken } = token;
      const isCorrectHash = refreshToken === savedToken;
      if (isCorrectHash) {
        return id;
      }
    }

    return null;
  }

  async deleteRefreshTokensByUserId(userId: string) {
    const tokens = await this.tokenRepository.find({
      where: { userId },
    });

    for (const token of tokens) {
      const { id } = token;
      await this.tokenRepository.delete(id);
    }
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const token: IToken = {
      id: generateUuid(),
      userId,
      refreshToken,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await this.tokenRepository.save(token);
  }

  private async generateTokens(userId: string, login: string) {
    const payload: IJwtPayload = {
      userId,
      login,
    };
    const accessToken = sign(payload, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });
    const refreshToken = sign(payload, JWT_SECRET_REFRESH_KEY, {
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });

    await this.deleteRefreshTokensByUserId(userId); //! remove all tokens?
    await this.saveRefreshToken(userId, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async hashString(value: string): Promise<string> {
    const salt = await genSalt(cryptSalt);
    return hash(value, salt);
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const { password } = createUserDto;
    const hashedPassword = await this.hashString(password);
    const updatedDto = {
      ...createUserDto,
      password: hashedPassword,
    };
    const user = await this.userService.createUser(updatedDto);
    const { id, login } = user;
    return this.generateTokens(id, login);
  }

  async login(createUserDto: CreateUserDto): Promise<any> {
    const { login, password } = createUserDto;
    const user = await this.userService.getUserByLogin(login);
    if (!user) throw new ForbiddenException();

    const { id, password: hash } = user;
    const isCorrectPassword = await compare(password, hash);
    if (!isCorrectPassword) throw new ForbiddenException();

    return this.generateTokens(id, login);
  }

  async refresh(refreshToken: string): Promise<any> {
    const tokenId = await this.getValidRefreshTokenId(refreshToken);
    if (!tokenId) throw new ForbiddenException('OOPS');
    const { userId, login } = await this.getPayload(
      refreshToken,
      JWT_SECRET_REFRESH_KEY,
    );
    return this.generateTokens(userId, login);
  }
}
