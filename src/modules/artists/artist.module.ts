import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../databases';

import { ArtistController } from './controllers';
import { ArtistService } from './services';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
