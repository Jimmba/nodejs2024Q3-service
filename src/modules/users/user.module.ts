import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../databases';

import { UserController } from './controllers';
import { UserService } from './services';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
