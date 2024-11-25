import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { serve, setup } from 'swagger-ui-express';

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AllExceptionsFilter } from './common/exceptions';
import { AppModule } from './app.module';
import { LoggingService } from './common/services';

async function bootstrap() {
  config();

  const port = parseInt(process.env.PORT) || 4001;
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (error) => {
    loggingService.fatal(`Uncaught Exception: ${error.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.fatal(
      `Unhandled Rejection at: ${promise}, reason: ${reason}`,
    );
    process.exit(1);
  });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost, loggingService),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const fileContents = await readFile('./doc/api.yaml', 'utf8');
  const swaggerDocument = load(fileContents);
  app.use('/doc', serve, setup(swaggerDocument));
  await app.listen(port);
  console.log(`Server is started on port ${port}`);
}
bootstrap();
