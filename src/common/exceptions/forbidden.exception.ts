import {
  ForbiddenException as _ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { IException } from '../interfaces';
import { ERROR_MESSAGES } from '../constants';

export class ForbiddenException extends _ForbiddenException {
  constructor(message?: string) {
    const error: IException = {
      statusCode: HttpStatus.FORBIDDEN,
      message: message || ERROR_MESSAGES.FORBIDDEN,
    };
    super(error);
  }
}
