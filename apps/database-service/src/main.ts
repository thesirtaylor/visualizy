import { NestFactory } from '@nestjs/core';
import { DatabaseServiceModule } from './database-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DatabaseServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [''],
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
