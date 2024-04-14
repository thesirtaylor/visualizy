import { NestFactory } from '@nestjs/core';
import { DatabaseServiceModule } from './database-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DatabaseServiceModule);
  await app.listen(3000);
}
bootstrap();
