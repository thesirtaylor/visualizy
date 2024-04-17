import {
  getRedisToken,
  DEFAULT_REDIS_NAMESPACE,
} from '@liaoliaots/nestjs-redis';
import { Test, TestingModule } from '@nestjs/testing';
import { AppRedisService } from './redis.service';

describe('AppRedisService', () => {
  let service: AppRedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppRedisService,
        {
          provide: getRedisToken(DEFAULT_REDIS_NAMESPACE),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<AppRedisService>(AppRedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
