import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { CreateBankDto } from '@nest-microservices/shared/dto';
import { AllExceptionsFilter } from './exception-filters/wildcard.exception.filters';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('bank')
export class DatabaseServiceController {
  constructor(
    private readonly databaseServiceService: DatabaseServiceService,
  ) {}

  @Post()
  @UseFilters(AllExceptionsFilter)
  CreateBank(@Body(ValidationPipe) createBankDto: CreateBankDto) {
    try {
      this.databaseServiceService.createBank(createBankDto);
      return { message: 'request ssuccessful' };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  @Get(':bic')
  @UseFilters(AllExceptionsFilter)
  FetchBank(@Param('bic') bic: string) {
    try {
      this.databaseServiceService.getBank(bic);
      return { message: 'request successful' };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  @Get()
  @UseFilters(AllExceptionsFilter)
  FetchBanks() {
    try {
      this.databaseServiceService.getBanks();
      return { message: 'request successful' };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
}
