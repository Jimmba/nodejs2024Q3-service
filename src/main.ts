import { config } from 'dotenv';

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AllExceptionsFilter } from './common';
import { AppModule } from './app.module';

async function bootstrap() {
  config();

  const port = parseInt(process.env.PORT) || 4001;
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(port);
}
bootstrap();
