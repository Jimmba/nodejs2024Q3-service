import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { appendFile, mkdir, rename, stat } from 'node:fs/promises';
import { basename, join } from 'node:path';

import { LOGS_FILES_OPTIONS } from '../../constants/fs.constant';
config();

const { LOG_FILE_SIZE } = process.env;
const maxLogSize = parseInt(LOG_FILE_SIZE) || LOGS_FILES_OPTIONS.maxLogSize;

@Injectable()
export class FsService {
  constructor() {
    this.createLogDirectory();
  }

  private async createLogDirectory(): Promise<void> {
    try {
      await mkdir(LOGS_FILES_OPTIONS.dir, { recursive: true });
    } catch (error) {
      throw error;
    }
  }

  private async getFileSize(filePath: string): Promise<number> {
    try {
      const stats = await stat(filePath);
      return stats.size;
    } catch (error) {
      return 0;
    }
  }

  private async rotateLogFile(filePath: string): Promise<void> {
    const fileSize = await this.getFileSize(filePath);
    if (fileSize < maxLogSize) {
      return;
    }

    const timestamp = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, '-');
    const rotatedFilePath = join(
      LOGS_FILES_OPTIONS.dir,
      `${basename(filePath, '.log')}-${timestamp}.log`,
    );

    try {
      await rename(filePath, rotatedFilePath);
    } catch (error) {
      throw error;
    }
  }

  private async writeLogToFile(
    fileName: string,
    message: string,
  ): Promise<void> {
    try {
      const filePath = join(LOGS_FILES_OPTIONS.dir, fileName);
      await this.rotateLogFile(filePath);
      await appendFile(filePath, message);
    } catch (error) {
      throw error;
    }
  }

  public async writeAllLogs(message): Promise<void> {
    return this.writeLogToFile(LOGS_FILES_OPTIONS.appFileName, message);
  }

  public async writeErrorLogs(message): Promise<void> {
    return this.writeLogToFile(LOGS_FILES_OPTIONS.errorFileName, message);
  }
}
