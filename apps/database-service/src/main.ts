import { NestFactory } from '@nestjs/core';
import { DatabaseServiceModule } from './database-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DatabaseServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_URI],
        },
        consumer: {
          groupId: 'database-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
