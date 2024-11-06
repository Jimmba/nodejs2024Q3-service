import { Module } from '@nestjs/common';
import { ArtistController } from './controllers';
import { Database } from '../../databases';
import { ArtistService } from './services';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, Database],
})
export class ArtistModule {}
