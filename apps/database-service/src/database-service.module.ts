import { Module } from '@nestjs/common';
import { DatabaseServiceController } from './database-service.controller';
import { DatabaseServiceService } from './database-service.service';

@Module({
  imports: [],
  controllers: [DatabaseServiceController],
  providers: [DatabaseServiceService],
})
export class DatabaseServiceModule {}
