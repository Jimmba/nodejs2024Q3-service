import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../databases';

import { FavoriteController } from './controllers';
import { FavoriteService } from './services';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
