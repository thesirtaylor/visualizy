import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateBankDto } from '@nest-microservices/shared/dto';
import { Bank } from '@nest-microservices/shared/entity';

@Injectable()
export class DatabaseServiceService implements OnModuleInit {
  constructor(
    @Inject('DATABASE_MICROSERVICE') private readonly dbclient: ClientKafka,
  ) {}

  onModuleInit() {
    this.dbclient.subscribeToResponseOf('get_bank');
    this.dbclient.subscribeToResponseOf('get_banks');
  }

  createBank(createBankDto: CreateBankDto) {
    this.dbclient.emit('create_bank', JSON.stringify(createBankDto));
  }

  getBank(bic: string) {
    this.dbclient
      .send('get_bank', JSON.stringify({ bic }))
      .subscribe((bank: Bank) => {
        console.log(bank);
      });
  }

  getBanks() {
    this.dbclient.send('get_banks', '').subscribe((banks: Array<Bank>) => {
      console.log(banks);
    });
  }
}
