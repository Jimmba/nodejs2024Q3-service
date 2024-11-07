import {
  UnprocessableEntityException as _UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';

import { ERROR_MESSAGES } from '../constants';
import { IException } from '../interfaces';

export class UnprocessableEntityException extends _UnprocessableEntityException {
  constructor(message?: string) {
    const error: IException = {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: message || ERROR_MESSAGES.UNPROCESSABLE_ENTITY,
    };
    super(error);
  }
}
