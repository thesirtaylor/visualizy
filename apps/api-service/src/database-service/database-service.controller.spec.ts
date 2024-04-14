import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseServiceController } from './database-service.controller';
import { DatabaseServiceService } from './database-service.service';

describe('DatabaseServiceController', () => {
  let controller: DatabaseServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseServiceController],
      providers: [DatabaseServiceService],
    }).compile();

    controller = module.get<DatabaseServiceController>(DatabaseServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
