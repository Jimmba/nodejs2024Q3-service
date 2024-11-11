import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../databases';
import { TrackController } from './controllers';

import { TrackService } from './services';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
