import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseServiceModule } from './database-service/database-service.module';

@Module({
  imports: [DatabaseServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
