import { Inject, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
import { Bank } from '@nest-microservices/shared/entity';
import { CreateBankDto } from '@nest-microservices/shared/dto';

@Injectable()
export class DatabaseServiceService {
  constructor(@Inject('BANKS_PROVIDERS') private bankRepository: typeof Bank) {}

  async create(bank: CreateBankDto) {
    const data = (await this.bankRepository.create({ ...bank })).get({
      plain: true,
    });
    return data;
  }

  async findOne(bic: string): Promise<Bank> {
    const data = (await this.bankRepository.findOne({ where: { bic } })).get({
      plain: true,
    });
    return data;
  }

  async findAll(): Promise<Array<Bank>> {
    return await this.bankRepository.findAll({});
  }
}
