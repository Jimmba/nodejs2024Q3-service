import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from '../services';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(LoggingService)
    private readonly loggingService: LoggingService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpException: HttpException;

    if (exception instanceof HttpException) {
      httpException = exception;
    } else {
      httpException = new InternalServerErrorException('Internal error');
      this.loggingService.fatal(
        `Unhandled error: ${JSON.stringify(
          exception,
          Object.getOwnPropertyNames(exception),
        )}`,
      );
      process.exit(1);
    }

    const { method, url } = ctx.getRequest();

    this.loggingService.error(
      `Request to [${method}] ${url} resulted in error: ${JSON.stringify(
        httpException.getResponse(),
      )}`,
      exception.stack,
    );

    httpAdapter.reply(
      ctx.getResponse(),
      httpException.getResponse(),
      httpException.getStatus(),
    );
  }
}
