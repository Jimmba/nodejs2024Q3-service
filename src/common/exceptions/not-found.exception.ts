import {
  NotFoundException as _NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { IException } from '../interfaces';
import { ERROR_MESSAGES } from '../constants';

export class NotFoundException extends _NotFoundException {
  constructor(message?: string) {
    const error: IException = {
      statusCode: HttpStatus.NOT_FOUND,
      message: message || ERROR_MESSAGES.NOT_FOUND,
    };
    super(error);
  }
}
