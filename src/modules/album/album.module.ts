import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../databases/';

import { AlbumController } from './controllers';
import { AlbumService } from './services';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
