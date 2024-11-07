import { IsDefined, IsString } from 'class-validator';

import { IUpdatePassword } from '../interfaces';
export class UpdatePasswordDto implements IUpdatePassword {
  @IsString()
  @IsDefined()
  oldPassword: string;

  @IsString()
  @IsDefined()
  newPassword: string;
}
