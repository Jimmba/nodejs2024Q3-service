import {
  BadRequestException as _BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { IException } from '../interfaces';
import { ERROR_MESSAGES } from '../constants';

export class BadRequestException extends _BadRequestException {
  constructor(message?: string) {
    const error: IException = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: message || ERROR_MESSAGES.BAD_REQUEST,
    };
    super(error);
  }
}
