import { CanActivate, ExecutionContext } from '@nestjs/common';
import { config } from 'dotenv';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

import { UnauthorizedException } from '../../../common/exceptions';

config();

const { JWT_SECRET_KEY } = process.env;

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { url } = request;

    const publicRoutes = ['/auth/signup', '/auth/login', '/doc', '/'];

    if (publicRoutes.includes(url)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await verify(token, JWT_SECRET_KEY);
    } catch (e) {
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
