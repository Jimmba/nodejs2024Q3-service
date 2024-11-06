import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './databases';
import { UserModule } from './users';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}
