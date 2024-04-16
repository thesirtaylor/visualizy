import { Controller, ValidationPipe } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBankDto } from '@nest-microservices/shared/dto';

@Controller()
export class DatabaseServiceController {
  constructor(
    private readonly databaseServiceService: DatabaseServiceService,
  ) {}

  @EventPattern('create_bank')
  async handleBankCreation(@Payload(ValidationPipe) data: CreateBankDto) {
    this.databaseServiceService.create(data);
  }

  @MessagePattern('get_bank')
  async handleFetchBank(@Payload('bic') bic: string) {
    return this.databaseServiceService.findOne(bic);
  }

  @MessagePattern('get_banks')
  async handleFetchBanks() {
    return this.databaseServiceService.findAll();
  }
}
