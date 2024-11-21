import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services';
import { CreateUserDto } from '../../../modules/users/dtos';
import { RefreshTokenDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUser: CreateUserDto): Promise<any> {
    return this.authService.signup(createUser);
  }

  @Post('login')
  login(@Body() createUser: CreateUserDto): Promise<any> {
    return this.authService.login(createUser);
  }

  @Post('refresh')
  refresh(@Body() body: RefreshTokenDto): Promise<any> {
    const { refreshToken } = body;
    return this.authService.refresh(refreshToken);
  }
}
