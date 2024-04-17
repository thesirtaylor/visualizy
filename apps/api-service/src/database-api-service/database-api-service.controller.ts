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
import { DatabaseApiServiceService } from './database-api-service.service';
import { CreateBankDto } from '../../../../libs/shared/src/lib/dto';
import { AllHttpExceptionsFilter } from '../../../../libs/shared/src/lib/exception-filters';
import { AuthGuard } from './auth-guards.ts/auth-guard';
import { ApiHeader, ApiBody } from '@nestjs/swagger';
import { BodyApi, HeaderApi } from './openapi';

@Controller('bank')
export class DatabaseServiceApiController {
  constructor(
    private readonly databaseApiServiceService: DatabaseApiServiceService,
  ) {}

  @Post()
  @ApiHeader(HeaderApi)
  @ApiBody(BodyApi)
  @UseGuards(AuthGuard)
  @UseFilters(AllHttpExceptionsFilter)
  async CreateBank(@Body(ValidationPipe) createBankDto: CreateBankDto) {
    await this.databaseApiServiceService.createBank(createBankDto);
    return;
  }

  @Get(':bic')
  @ApiHeader(HeaderApi)
  @UseGuards(AuthGuard)
  @UseFilters(AllHttpExceptionsFilter)
  async FetchBank(@Param('bic') bic: string) {
    await this.databaseApiServiceService.getBank(bic);
    return;
  }

  @Get()
  @UseFilters(AllHttpExceptionsFilter)
  async FetchBanks() {
    await this.databaseApiServiceService.getBanks();
    return;
  }
}
