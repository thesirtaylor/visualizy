import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseServiceController } from './database-service.controller';
import { DatabaseServiceService } from './database-service.service';
import {
  createdMockBank,
  validBankData,
} from '../../../libs/shared/src/lib/mockdata';

describe('DatabaseServiceController', () => {
  let controller: DatabaseServiceController;
  let service: DatabaseServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseServiceController],
      providers: [
        {
          provide: DatabaseServiceService,
          useFactory: () => ({ create: jest.fn() }),
        },
      ],
    }).compile();

    controller = module.get<DatabaseServiceController>(
      DatabaseServiceController,
    );
    service = module.get<DatabaseServiceService>(DatabaseServiceService);
  });

  describe("@EventPattern('create_bank')", () => {
    it('should call service.create on handleBankCreation to successfully create a bank', async () => {
      await controller.handleBankCreation(validBankData);
      expect(service.create).toHaveBeenCalledWith(validBankData);
    });

    it('should fail if service.create is not called on handleBankCreation', async () => {
      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new Error('Unexpected call to service.create');
      });

      try {
        await controller.handleBankCreation(validBankData);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Unexpected call to service.create');
      }
    });
  });

  describe("@MessagePattern('get_bank')", () => {
    it('should call service.findOne on handleFetchBank', async () => {
      const bic = validBankData.bic;
      const mockBank = createdMockBank;
      service.findOne = jest.fn().mockReturnValue(mockBank);
      const fetchedBank = await controller.handleFetchBank(bic);
      expect(service.findOne).toHaveBeenCalledWith(bic);
      expect(fetchedBank).toBe(mockBank);
    });

    it('should return null on handleFetchBank with invalid BIC', async () => {
      const invalidBic = 'invalid-bic';
      service.findOne = jest.fn().mockReturnValue(null);
      const fetchedBank = await controller.handleFetchBank(invalidBic);
      expect(service.findOne).toHaveBeenCalledWith(invalidBic);
      expect(fetchedBank).toBeNull();
    });
  });

  describe("@Message('get_banks')", () => {
    it('should call service.findAll on handleFetchBanks', async () => {
      const mockBanks = [createdMockBank];
      service.findAll = jest.fn().mockReturnValue(mockBanks);
      const fetchedBanks = await controller.handleFetchBanks();
      expect(service.findAll).toHaveBeenCalled();
      expect(fetchedBanks).toEqual(mockBanks);
    });
  });
});
