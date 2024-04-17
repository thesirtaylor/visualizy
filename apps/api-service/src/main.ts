import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const apiConfig = new DocumentBuilder()
    .setTitle('Api Gateway')
    .setDescription('Api Gateway for Visualizy Bank Service')
    .setVersion('0.1.0')
    .addTag('banks')
    .build();
  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
