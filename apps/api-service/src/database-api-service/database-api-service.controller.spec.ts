import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseServiceApiController } from './database-api-service.controller';
import { DatabaseApiServiceService } from './database-api-service.service';
import { DatabaseApiServiceModule } from './database-api-service.module';
import {
  AppLoggerService,
  LoggerModule,
} from '../../../../libs/shared/src/lib/logger';
import {
  AppRedisService,
  AppRedisModule,
} from '../../../../libs/shared/src/lib/redis';

describe('DatabaseApiServiceController', () => {
  let controller: DatabaseServiceApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseServiceApiController],
      providers: [
        AppLoggerService,
        AppRedisService,
        DatabaseApiServiceService,
        {
          provide: 'DATABASE_MICROSERVICE',
          useValue: jest.fn(),
        },
      ],
      imports: [DatabaseApiServiceModule, AppRedisModule, LoggerModule],
    }).compile();

    controller = module.get<DatabaseServiceApiController>(
      DatabaseServiceApiController,
    );
  });

  it('should be defined ', () => {
    expect(controller).toBeDefined();
  });
});
