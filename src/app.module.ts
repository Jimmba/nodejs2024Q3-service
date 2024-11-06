import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './databases';
import { ArtistModule, UserModule } from './modules';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}
