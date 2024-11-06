import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserIdDto,
  UserResponseDto,
} from '../dtos';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUses(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param() params: UserIdDto): Promise<UserResponseDto> {
    const { id } = params;
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUser);
  }

  @Put(':id')
  updatePassword(@Param() params: UserIdDto, @Body() body: UpdatePasswordDto) {
    const { id } = params;
    return this.userService.updatePassword(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param() params: UserIdDto) {
    const { id } = params;
    return this.userService.deleteUser(id);
  }
}
