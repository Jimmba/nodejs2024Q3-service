import { PickType } from '@nestjs/mapped-types';

import { UserDto } from './user.dto';

export class UserIdDto extends PickType(UserDto, ['id']) {}
