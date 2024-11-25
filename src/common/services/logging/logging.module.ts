import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { FsService } from '../fs';

@Module({
  providers: [FsService, LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
