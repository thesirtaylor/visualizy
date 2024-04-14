import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bank } from '@nest-microservices/shared/entity';
import { CreateBankDto } from '@nest-microservices/shared/dto';

@Injectable()
export class DatabaseServiceService {
  constructor(
    @InjectModel(Bank) private readonly bankRepository: typeof Bank,
  ) {}

  async create(bank: CreateBankDto) {
    return this.bankRepository.create({ ...bank });
  }

  async findOne(bic: string): Promise<Bank> {
    return this.bankRepository.findOne({ where: { bic } });
  }

  async findAll(): Promise<Array<Bank>> {
    return this.bankRepository.findAll({});
  }
}
