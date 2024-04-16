import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateBankDto } from '@nest-microservices/shared/dto';
import { Bank } from '@nest-microservices/shared/entity';
import { AppRedisService } from '../../../../libs/shared/src/lib/redis';
import { AppLoggerService } from '../../../../libs/shared/src/lib/logger';

@Injectable()
export class DatabaseServiceService implements OnModuleInit {
  constructor(
    @Inject('DATABASE_MICROSERVICE') private readonly dbclient: ClientKafka,
    private readonly redisClient: AppRedisService,
    private readonly logger: AppLoggerService,
  ) {
    this.logger.setContext(DatabaseServiceService.name);
  }

  async onModuleInit() {
    this.dbclient.subscribeToResponseOf('get_bank');
    this.dbclient.subscribeToResponseOf('get_banks');
  }

  async createBank(createBankDto: CreateBankDto) {
    this.redisClient.createIdempotencyKey('create_bank', createBankDto, () => {
      return this.dbclient.emit('create_bank', JSON.stringify(createBankDto));
    });
  }

  async getBank(bic: string) {
    return this.dbclient
      .send('get_bank', JSON.stringify({ bic }))
      .subscribe(async (bank: Bank) => {
        this.logger.log({ bank });
      });
  }

  async getBanks() {
    return this.dbclient
      .send('get_banks', '')
      .subscribe((banks: Array<Bank>) => {
        this.logger.log({ banks });
      });
  }
}
