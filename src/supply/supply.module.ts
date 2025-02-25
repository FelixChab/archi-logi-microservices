import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupplyService } from './supply.service';
import { SupplyController } from './supply.controller';

@Module({
  imports: [HttpModule],
  providers: [SupplyService],
  controllers: [SupplyController],
})
export class SupplyModule {}
