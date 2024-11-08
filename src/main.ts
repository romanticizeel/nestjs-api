import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // whitelist: true, means that if the user sends extra data that is not in the dto, it will be ignored
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
