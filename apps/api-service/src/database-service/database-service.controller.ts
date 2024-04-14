import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { CreateBankDto } from '@nest-microservices/shared/dto';

@Controller('bank')
export class DatabaseServiceController {
  constructor(
    private readonly databaseServiceService: DatabaseServiceService,
  ) {}

  @Post()
  CreateBank(@Body(ValidationPipe) createBankDto: CreateBankDto) {
    return this.databaseServiceService.createBank(createBankDto);
  }

  @Get(':bic')
  FetchBank(@Param('bic') bic: string) {
    return this.databaseServiceService.getBank(bic);
  }

  @Get()
  FetchBanks() {
    return this.databaseServiceService.getBanks();
  }
}
