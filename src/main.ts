import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  ); // whitelist: true, means that if the user sends extra data that is not in the dto, it will be ignored

  const config = new DocumentBuilder()
    .setTitle('NestJs API')
    .setDescription(
      'Modular API for managing various functions and services',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl:
              'http://localhost:3333/auth/google-redirect',
            tokenUrl:
              'https://oauth2.googleapis.com/token',
            scopes: {
              openid:
                'OpenID Connect scope for authentication',
              profile: 'Access to user profile',
              email: 'Access to user email',
            },
          },
        },
      },
      'google-oauth',
    )
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'api',
    app,
    documentFactory,
  );
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
