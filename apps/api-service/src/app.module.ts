import { Module } from '@nestjs/common';
import { DatabaseApiServiceModule } from './database-api-service/database-api-service.module';
import {
  AppRedisModule,
  AppRedisService,
} from '../../../libs/shared/src/lib/redis';
import { SharedModule } from '../../../libs/shared/src/shared.module';
import { LoggerModule } from '../../../libs/shared/src/lib/logger';

@Module({
  imports: [
    DatabaseApiServiceModule,
    AppRedisModule,
    SharedModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [AppRedisService],
})
export class AppModule {}
