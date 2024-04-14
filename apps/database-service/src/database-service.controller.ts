import { Controller, Get } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';

@Controller()
export class DatabaseServiceController {
  constructor(private readonly databaseServiceService: DatabaseServiceService) {}

  @Get()
  getHello(): string {
    return this.databaseServiceService.getHello();
  }
}
