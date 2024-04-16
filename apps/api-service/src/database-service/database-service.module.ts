import { Module } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { DatabaseServiceController } from './database-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from './auth-guards.ts/auth-guard';
import { AppRedisService } from '../../../../libs/shared/src/lib/redis';
import { AppLoggerService } from '../../../../libs/shared/src/lib/logger';

@Module({
  controllers: [DatabaseServiceController],
  providers: [
    DatabaseServiceService,
    AuthGuard,
    AppRedisService,
    AppLoggerService,
  ],
  imports: [
    ClientsModule.register([
      {
        name: 'DATABASE_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'database',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'database-consumer',
          },
        },
      },
    ]),
  ],
})
export class DatabaseServiceModule {}
