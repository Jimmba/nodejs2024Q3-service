import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services';
import { CreateUserDto } from '../../../modules/users/dtos';
import { RefreshTokenDto } from '../dto';
import { UnauthorizedException } from '../../../common/exceptions';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUser: CreateUserDto): Promise<any> {
    console.log('signup');
    return this.authService.signup(createUser);
  }

  @Post('login')
  login(@Body() createUser: CreateUserDto): Promise<any> {
    return this.authService.login(createUser);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @Body() //! Change to pipe?
    body: RefreshTokenDto,
  ): Promise<any> {
    const { refreshToken } = body;
    if (!refreshToken) throw new UnauthorizedException();
    return this.authService.refresh(refreshToken);
  }
}
