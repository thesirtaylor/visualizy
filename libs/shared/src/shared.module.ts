import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { AppRedisModule } from './lib/redis/redis.module';
import { AppRedisService } from './lib/redis/redis.service';

@Module({
  imports: [AppRedisModule],
  providers: [SharedService, AppRedisService],
  exports: [SharedService],
})
export class SharedModule {}
