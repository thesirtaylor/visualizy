import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseServiceService } from './database-service.service';
import { Bank } from '../../../libs/shared/src/lib/entity';
import { AppLoggerService } from './../../../libs/shared/src/lib/logger';
import {
  validBankData,
  createdMockBank,
} from '../../../libs/shared/src/lib/mockdata';

describe('DatabaseServiceService', () => {
  let service: DatabaseServiceService;
  let bankRepositoryMock: Partial<typeof Bank>;
  const createMockBank = validBankData;

  beforeEach(async () => {
    bankRepositoryMock = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseServiceService,
        { provide: 'BANKS_PROVIDERS', useValue: bankRepositoryMock },
        AppLoggerService,
      ],
    }).compile();

    service = module.get<DatabaseServiceService>(DatabaseServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bank', async () => {
      (bankRepositoryMock.create as jest.Mock).mockReturnValueOnce({
        get: jest.fn().mockReturnValueOnce(createdMockBank),
      });

      const result = await service.create(createMockBank);

      expect(bankRepositoryMock.create).toHaveBeenCalledWith({
        ...createMockBank,
      });
      expect(result).toEqual(createdMockBank);
    });
  });

  describe('findOne', () => {
    it('should find a bank by bic', async () => {
      const bic = 'mockBic';
      (bankRepositoryMock.findOne as jest.Mock).mockReturnValueOnce({
        get: jest.fn().mockReturnValueOnce(createdMockBank),
      });

      const result = await service.findOne(bic);

      expect(bankRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { bic },
      });
      expect(result).toEqual(createdMockBank);
    });
  });

  describe('findAll', () => {
    it('should find all banks', async () => {
      const mockBanks = [createdMockBank];

      (bankRepositoryMock.findAll as jest.Mock).mockReturnValueOnce(mockBanks);

      const result = await service.findAll();

      expect(bankRepositoryMock.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual(mockBanks);
    });
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });
});
