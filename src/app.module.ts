import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplyModule } from './supply/supply.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from './config/config.module';

dotenv.config();

@Module({
  imports: [SupplyModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
