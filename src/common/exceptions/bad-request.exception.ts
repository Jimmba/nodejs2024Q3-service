import {
  BadRequestException as _BadRequestException,
  HttpStatus,
} from '@nestjs/common';

import { ERROR_MESSAGES } from '../constants';
import { IException } from '../interfaces';

export class BadRequestException extends _BadRequestException {
  constructor(message?: string) {
    const error: IException = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: message || ERROR_MESSAGES.BAD_REQUEST,
      error: ERROR_MESSAGES.BAD_REQUEST,
    };
    super(error);
  }
}
