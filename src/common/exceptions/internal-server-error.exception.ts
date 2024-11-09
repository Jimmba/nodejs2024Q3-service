import {
  HttpStatus,
  InternalServerErrorException as _InternalServerErrorException,
} from '@nestjs/common';

import { ERROR_MESSAGES } from '../constants';
import { IException } from '../interfaces';

export class InternalServerErrorException extends _InternalServerErrorException {
  constructor() {
    const error: IException = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };
    super(error);
  }
}
