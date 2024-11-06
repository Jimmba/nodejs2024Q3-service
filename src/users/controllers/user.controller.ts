import { Controller, Get } from '@nestjs/common';
import { UserResponseDto } from '../dtos';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUses(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }
}
