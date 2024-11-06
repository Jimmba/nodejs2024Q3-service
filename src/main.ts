import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  config();

  const port = parseInt(process.env.PORT) || 4001;
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe());
  console.log(port);
  await app.listen(port);
}
bootstrap();
