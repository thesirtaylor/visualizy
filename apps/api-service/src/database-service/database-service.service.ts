import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateBankDto } from 'defaultLibraryPrefix/shared/lib/dto';

@Injectable()
export class DatabaseServiceService {
  constructor(
    @Inject('DATABASE_MICROSERVICE') private readonly dbclient: ClientKafka,
  ) {}

  createBank(createBankDto: CreateBankDto) {
    this.dbclient.emit('create_bank', JSON.stringify(createBankDto));
  }
}
