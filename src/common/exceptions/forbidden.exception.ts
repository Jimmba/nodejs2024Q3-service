import {
  ForbiddenException as _ForbiddenException,
  HttpStatus,
} from '@nestjs/common';

import { ERROR_MESSAGES } from '../constants';
import { IException } from '../interfaces';

export class ForbiddenException extends _ForbiddenException {
  constructor(message?: string) {
    const error: IException = {
      statusCode: HttpStatus.FORBIDDEN,
      message: message || ERROR_MESSAGES.FORBIDDEN,
    };
    super(error);
  }
}
