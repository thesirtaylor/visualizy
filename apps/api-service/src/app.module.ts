import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseServiceModule } from './database-service/database-service.module';
import {
  AppRedisModule,
  AppRedisService,
} from '../../../libs/shared/src/lib/redis';
import { SharedModule } from 'libs/shared/src';
import { LoggerModule } from '../../../libs/shared/src/lib/logger';

@Module({
  imports: [DatabaseServiceModule, AppRedisModule, SharedModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, AppRedisService],
})
export class AppModule {}
