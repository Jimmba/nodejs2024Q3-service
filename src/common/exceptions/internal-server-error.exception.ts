import {
  HttpStatus,
  InternalServerErrorException as _InternalServerErrorException,
} from '@nestjs/common';
import { IException } from '../interfaces';
import { ERROR_MESSAGES } from '../constants';

export class InternalServerErrorException extends _InternalServerErrorException {
  constructor() {
    const error: IException = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };
    super(error);
  }
}
