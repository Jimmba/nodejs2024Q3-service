import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../databases';

import { UserController } from './controllers';
import { UserService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
