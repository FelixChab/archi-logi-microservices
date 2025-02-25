import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplyModule } from './supply/supply.module';

@Module({
  imports: [SupplyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
