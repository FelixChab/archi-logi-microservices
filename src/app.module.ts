import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplyModule } from './supply/supply.module';
import * as dotenv from 'dotenv';
import { PingController } from './ping/ping.controller';

dotenv.config();

@Module({
  imports: [SupplyModule],
  controllers: [AppController, PingController],
  providers: [AppService],
})
export class AppModule {}
