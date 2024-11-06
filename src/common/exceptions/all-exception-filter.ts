import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpException: HttpException;

    if (exception instanceof HttpException) {
      httpException = exception;
    } else {
      httpException = new InternalServerErrorException('Internal error');
      console.error(
        `Unhandled error: ${JSON.stringify(
          exception,
          Object.getOwnPropertyNames(exception),
        )}`,
      );
    }

    httpAdapter.reply(
      ctx.getResponse(),
      httpException.getResponse(),
      httpException.getStatus(),
    );
  }
}
