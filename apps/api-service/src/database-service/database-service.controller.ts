import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { CreateBankDto } from '@nest-microservices/shared/dto';
import { AllHttpExceptionsFilter } from '@nest-microservices/shared/exception';
import { AuthGuard } from './auth-guards.ts/auth-guard';
import { ApiHeader, ApiBody } from '@nestjs/swagger';
import { BodyApi, HeaderApi } from './openapi';

@Controller('bank')
export class DatabaseServiceController {
  constructor(
    private readonly databaseServiceService: DatabaseServiceService,
  ) {}

  @Post()
  @ApiHeader(HeaderApi)
  @ApiBody(BodyApi)
  @UseGuards(AuthGuard)
  @UseFilters(AllHttpExceptionsFilter)
  async CreateBank(@Body(ValidationPipe) createBankDto: CreateBankDto) {
    await this.databaseServiceService.createBank(createBankDto);
    return;
  }

  @Get(':bic')
  @ApiHeader(HeaderApi)
  @UseGuards(AuthGuard)
  @UseFilters(AllHttpExceptionsFilter)
  async FetchBank(@Param('bic') bic: string) {
    await this.databaseServiceService.getBank(bic);
    return;
  }

  @Get()
  @UseFilters(AllHttpExceptionsFilter)
  async FetchBanks() {
    await this.databaseServiceService.getBanks();
    return;
  }
}
