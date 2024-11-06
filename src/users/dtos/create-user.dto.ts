import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { ICreateUser } from '../interfaces';

export class CreateUserDto
  extends PickType(UserDto, ['login', 'password'])
  implements ICreateUser {}
