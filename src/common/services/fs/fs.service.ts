import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { appendFile, mkdir, rename, stat } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { LOGS_FILES_OPTIONS } from 'src/common/constants/fs.constant';
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
      // console.error('Error creating log directory', error);
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
      // console.error(`Error rotating log file: ${filePath}`, error);
    }
  }

  private async appendFile(fileName: string, message: string) {
    const filePath = join(LOGS_FILES_OPTIONS.dir, fileName);
    return appendFile(filePath, message);
  }

  private async writeLogToFile(
    filePath: string,
    message: string,
  ): Promise<void> {
    try {
      await this.rotateLogFile(filePath);
      await this.appendFile(filePath, message);
    } catch (error) {
      throw error;
      // console.error(`Error writing to log file ${filePath}`, error);
    }
  }

  public async writeAllLogs(message): Promise<void> {
    return this.writeLogToFile(LOGS_FILES_OPTIONS.appFileName, message);
  }

  public async writeErrorLogs(message): Promise<void> {
    return this.writeLogToFile(LOGS_FILES_OPTIONS.errorFileName, message);
  }
}
