import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { UnauthorizedException } from '../../../common/exceptions';
import { RefreshTokenDto } from '../dto';
import { AuthService } from '../services';
import { CreateUserDto } from '../../../modules/users/dtos';
import { IUserResponse } from '../../../modules/users/interfaces';
import { ITokens } from '../interfaces';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUser: CreateUserDto): Promise<IUserResponse> {
    return this.authService.signup(createUser);
  }

  @Post('login')
  login(@Body() createUser: CreateUserDto): Promise<ITokens> {
    return this.authService.login(createUser);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @Body()
    body: RefreshTokenDto,
  ): Promise<ITokens> {
    const { refreshToken } = body;
    if (!refreshToken) throw new UnauthorizedException();
    return this.authService.refresh(refreshToken);
  }
}
