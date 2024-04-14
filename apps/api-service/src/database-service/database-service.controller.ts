import { Controller } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';

@Controller()
export class DatabaseServiceController {
  constructor(
    private readonly databaseServiceService: DatabaseServiceService,
  ) {}
}
