import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/uploads', express.static('uploads'));
  const configService = app.get(ConfigService);

  await app.listen(process.env.PORT ?? configService.getOrThrow<number>('PORT'));
}
bootstrap();
