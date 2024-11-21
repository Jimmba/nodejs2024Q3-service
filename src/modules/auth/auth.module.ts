import { Module } from '@nestjs/common';

import { AuthController } from './controllers';
import { AuthService } from './services';
import { UserModule } from '../users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
