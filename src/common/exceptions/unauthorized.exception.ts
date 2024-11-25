import {
  UnauthorizedException as _UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';

import { ERROR_MESSAGES } from '../constants';
import { IException } from '../interfaces';

export class UnauthorizedException extends _UnauthorizedException {
  constructor(message?: string) {
    const error: IException = {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: message || ERROR_MESSAGES.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };
    super(error);
  }
}
