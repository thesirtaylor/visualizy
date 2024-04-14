import { Module } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { DatabaseServiceController } from './database-service.controller';

@Module({
  controllers: [DatabaseServiceController],
  providers: [DatabaseServiceService],
})
export class DatabaseServiceModule {}
