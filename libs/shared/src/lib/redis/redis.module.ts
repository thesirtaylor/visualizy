import { Module } from '@nestjs/common';
import { AppRedisService } from './redis.service';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../lib/configs';
import { AppLoggerService } from '../logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
        logger: AppLoggerService,
      ) => {
        const moduleOptions: RedisModuleOptions = {
          closeClient: true,
          readyLog: true,
          errorLog: true,
          config: {
            url: configService.get<string>('database.redis_url'),
            onClientCreated: async () => {
              logger
                .setContext(AppRedisModule.name)
                .log('IORedis \u2013 application redis client ready');
            },
          },
        };
        return moduleOptions;
      },
      inject: [ConfigService, AppLoggerService],
    }),
  ],
  providers: [AppRedisService],
  exports: [AppRedisService],
})
export class AppRedisModule {}
