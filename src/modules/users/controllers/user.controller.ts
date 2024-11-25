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

import { CreateUserDto, UpdatePasswordDto, UserIdDto } from '../dtos';
import { IUserResponse } from '../interfaces';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUses(): Promise<IUserResponse[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param() params: UserIdDto): Promise<IUserResponse> {
    const { id } = params;
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto): Promise<IUserResponse> {
    return this.userService.createUser(createUser);
  }

  @Put(':id')
  updatePassword(
    @Param() params: UserIdDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<IUserResponse> {
    const { id } = params;
    return this.userService.updatePassword(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param() params: UserIdDto): Promise<void> {
    const { id } = params;
    return this.userService.deleteUser(id);
  }
}
