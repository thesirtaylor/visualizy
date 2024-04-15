import { Module } from '@nestjs/common';
import { AppRedisService } from './redis.service';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '@nest-microservices/shared/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const moduleOptions: RedisModuleOptions = {
          closeClient: true,
          readyLog: true,
          errorLog: true,
          config: {
            url: configService.get<string>('database.redis_url'),
            onClientCreated: async () => {
              console.log('redis is live'); //replace with nestjs logger
            },
          },
        };
        return moduleOptions;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppRedisService],
  exports: [AppRedisService],
})
export class AppRedisModule {}
