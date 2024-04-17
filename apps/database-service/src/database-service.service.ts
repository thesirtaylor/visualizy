import { Inject, Injectable } from '@nestjs/common';
import { Bank } from '../../../libs/shared/src/lib/entity';
import { CreateBankDto } from '../../../libs/shared/src/lib/dto';
import { AppLoggerService } from '../../../libs/shared/src/lib/logger';

@Injectable()
export class DatabaseServiceService {
  [x: string]: any;
  constructor(
    @Inject('BANKS_PROVIDERS') private bankRepository: typeof Bank,
    readonly logger: AppLoggerService,
  ) {
    this.logger.setContext(DatabaseServiceService.name);
  }

  async create(bank: CreateBankDto) {
    const data = (await this.bankRepository.create({ ...bank })).get({
      plain: true,
    });
    const { name } = data;
    this.logger.log(name);
    return data;
  }

  async findOne(bic: string): Promise<Bank> {
    const data = await this.bankRepository.findOne({ where: { bic } });
    return data?.get({ plain: true });
  }

  async findAll(): Promise<Array<Bank>> {
    return await this.bankRepository.findAll({});
  }
}
