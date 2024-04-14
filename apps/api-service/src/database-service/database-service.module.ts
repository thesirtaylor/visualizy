import { Module } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { DatabaseServiceController } from './database-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [DatabaseServiceController],
  providers: [DatabaseServiceService],
  imports: [
    ClientsModule.register([
      {
        name: 'DATABASE_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'database',
            brokers: [''],
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
