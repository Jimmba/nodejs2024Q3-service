import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers';
import { Database } from 'src/databases';

@Module({
  providers: [Database, UserService],
  controllers: [UserController],
})
export class UserModule {}
