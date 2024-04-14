import { Module } from '@nestjs/common';
import { DatabaseServiceController } from './database-service.controller';
import { DatabaseServiceService } from './database-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import DatabaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        uri: configService.get<string>('database.uri'),
        models: [],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DatabaseServiceController],
  providers: [DatabaseServiceService],
})
export class DatabaseServiceModule {}
