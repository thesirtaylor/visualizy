import { Controller, ValidationPipe } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBankDto } from '../../../libs/shared/src/lib/dto';

@Controller()
export class DatabaseServiceController {
  constructor(
    private readonly databaseServiceService: DatabaseServiceService,
  ) {}

  @EventPattern('create_bank')
  async handleBankCreation(@Payload(ValidationPipe) data: CreateBankDto) {
    await this.databaseServiceService.create(data);
  }

  @MessagePattern('get_bank')
  async handleFetchBank(@Payload('bic') bic: string) {
    return await this.databaseServiceService.findOne(bic);
  }

  @MessagePattern('get_banks')
  async handleFetchBanks() {
    return await this.databaseServiceService.findAll();
  }
}
