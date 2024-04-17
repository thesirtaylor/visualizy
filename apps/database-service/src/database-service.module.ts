import { Module } from '@nestjs/common';
import { DatabaseServiceController } from './database-service.controller';
import { DatabaseServiceService } from './database-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfig } from '../../../libs/shared/src/lib/configs';
import { Bank } from '../../../libs/shared/src/lib/entity';
import { BanksProviders } from './database.providers';
import { LoggerModule } from '../../../libs/shared/src/lib/logger';
import { AppLoggerService } from '../../../libs/shared/src/lib/logger';
@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      load: [DatabaseConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        uri: configService.get<string>('database.uri'),
        models: [Bank],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DatabaseServiceController],
  providers: [DatabaseServiceService, AppLoggerService, ...BanksProviders],
})
export class DatabaseServiceModule {}
