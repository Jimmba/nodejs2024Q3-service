import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { config } from 'dotenv';

import { LOG_CODES, LOG_LEVELS } from '../../constants';
import { FsService } from '../fs';

config();

const { LOG_LEVEL } = process.env;
const DEFAULT_LEVEL = LOG_CODES.LOG;

const getLogLevel = (): number => {
  const level = parseInt(LOG_LEVEL);
  if (level || level === 0) return level;
  return DEFAULT_LEVEL;
};

@Injectable()
export class LoggingService implements LoggerService {
  private logLevel: number;

  constructor(
    @Inject(FsService)
    private readonly fsService: FsService,
  ) {
    this.logLevel = getLogLevel();
  }

  private async writeLog(
    level: LOG_LEVELS,
    message: string,
    isWriteToFile = true,
  ) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    process.stdout.write(logMessage);

    if (!isWriteToFile) return;

    if (level === LOG_LEVELS.ERROR) {
      this.fsService.writeErrorLogs(logMessage).catch((e) => {
        this.writeLog(LOG_LEVELS.ERROR, e.message, false);
      });
    }
    this.fsService.writeAllLogs(logMessage).catch((e) => {
      this.writeLog(LOG_LEVELS.ERROR, e.message, false);
    });
  }

  fatal(message: string) {
    if (this.logLevel < LOG_CODES.FATAL) return;
    this.writeLog(LOG_LEVELS.FATAL, message);
  }

  error(message: string, trace?: string) {
    if (this.logLevel < LOG_CODES.ERROR) return;
    this.writeLog(
      LOG_LEVELS.ERROR,
      `${message}${trace ? '\nTrace: ' + trace : ''}`,
    );
  }

  warn(message: string) {
    if (this.logLevel < LOG_CODES.WARN) return;
    this.writeLog(LOG_LEVELS.WARN, message);
  }

  log(message: string) {
    if (this.logLevel < LOG_CODES.LOG) return;
    this.writeLog(LOG_LEVELS.LOG, message);
  }

  debug?(message: string) {
    if (this.logLevel < LOG_CODES.DEBUG) return;
    this.writeLog(LOG_LEVELS.DEBUG, message);
  }

  verbose?(message: string) {
    if (this.logLevel < LOG_CODES.VERBOSE) return;
    this.writeLog(LOG_LEVELS.VERBOSE, message);
  }
}
