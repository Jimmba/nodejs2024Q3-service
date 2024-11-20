import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggingService } from '../services/logging';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { url, query, body, method } = request;

    this.loggingService.log(
      `Incoming Request: [${method}] ${url} | Query: ${JSON.stringify(
        query,
      )} | Body: ${JSON.stringify(body)}`,
    );

    return next.handle().pipe(
      tap((response) => {
        const statusCode = response.statusCode || 200;
        this.loggingService.log(
          `Response: [${statusCode}] ${url} | Body: ${JSON.stringify(
            response,
          )}`,
        );
      }),
    );
  }
}
