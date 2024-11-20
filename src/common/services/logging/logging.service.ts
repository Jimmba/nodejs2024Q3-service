import { Injectable, LoggerService } from '@nestjs/common';
import { config } from 'dotenv';

import { LOG_CODES, LOG_LEVELS } from './logging.constants';

config();

const { LOG_LEVEL } = process.env;
const DEFAULT_LEVEL = LOG_CODES.INFO;

const getLogLevel = (): number => {
  const level = parseInt(LOG_LEVEL);
  if (level || level === 0) return level;
  return DEFAULT_LEVEL;
};

@Injectable()
export class LoggingService implements LoggerService {
  private logLevel: number;

  constructor() {
    this.logLevel = getLogLevel();
  }

  private writeLog(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    process.stdout.write(logMessage);
  }

  fatal(message: any) {
    if (this.logLevel < LOG_CODES.FATAL) return;
    this.writeLog(LOG_LEVELS.FATAL, message);
  }

  error(message: any, trace?: string) {
    if (this.logLevel < LOG_CODES.ERROR) return;
    this.writeLog(
      LOG_LEVELS.ERROR,
      `${message}${trace ? '\nTrace: ' + trace : ''}`,
    );
  }

  warn(message: any) {
    if (this.logLevel < LOG_CODES.WARN) return;
    this.writeLog(LOG_LEVELS.WARN, message);
  }

  log(message: any) {
    if (this.logLevel < LOG_CODES.INFO) return;
    this.writeLog(LOG_LEVELS.INFO, message);
  }

  debug?(message: any) {
    if (this.logLevel < LOG_CODES.DEBUG) return;
    this.writeLog(LOG_LEVELS.DEBUG, message);
  }
}
