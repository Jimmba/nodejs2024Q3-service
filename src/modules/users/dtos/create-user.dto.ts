import { PickType } from '@nestjs/mapped-types';

import { ICreateUser } from '../interfaces';
import { UserDto } from './user.dto';

export class CreateUserDto
  extends PickType(UserDto, ['login', 'password'])
  implements ICreateUser {}
