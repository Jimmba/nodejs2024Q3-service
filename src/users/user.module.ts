import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers';
import { Database } from '../databases';

@Module({
  controllers: [UserController],
  providers: [Database, UserService],
})
export class UserModule {}
