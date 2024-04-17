import { Module } from '@nestjs/common';
import { DatabaseApiServiceService } from './database-api-service.service';
import { DatabaseServiceApiController } from './database-api-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from './auth-guards.ts/auth-guard';
import { AppRedisService } from '../../../../libs/shared/src/lib/redis';
import { AppLoggerService } from '../../../../libs/shared/src/lib/logger';

@Module({
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
  controllers: [DatabaseServiceApiController],
  providers: [
    DatabaseApiServiceService,
    AuthGuard,
    AppRedisService,
    AppLoggerService,
  ],
})
export class DatabaseApiServiceModule {}
