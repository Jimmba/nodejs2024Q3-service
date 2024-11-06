import { HttpStatus } from '@nestjs/common';

export interface IException {
  statusCode: HttpStatus;
  message: string;
}
