import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { serve, setup } from 'swagger-ui-express';

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AllExceptionsFilter } from './common/exceptions';
import { AppModule } from './app.module';

async function bootstrap() {
  config();

  const port = parseInt(process.env.PORT) || 4001;
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const fileContents = await readFile('./doc/api.yaml', 'utf8');
  const swaggerDocument = load(fileContents);
  app.use('/doc', serve, setup(swaggerDocument));
  await app.listen(port);
  console.log(`Server is started on port ${port}`);
}
bootstrap();
