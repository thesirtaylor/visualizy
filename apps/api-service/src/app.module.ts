import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseServiceModule } from './database-service/database-service.module';
import { AppRedisService } from '../../../libs/shared/src/lib/redis/redis.service';
import { AppRedisModule } from '../../../libs/shared/src/lib/redis/redis.module';
import { SharedModule } from 'libs/shared/src';

@Module({
  imports: [DatabaseServiceModule, AppRedisModule, SharedModule],
  controllers: [AppController],
  providers: [AppService, AppRedisService],
})
export class AppModule {}
