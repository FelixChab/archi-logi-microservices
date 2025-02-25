import { Module } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyController } from './supply.controller';
import { supplyProviders } from './providers/supply.provider';

@Module({
  providers: [...supplyProviders, SupplyService],
  controllers: [SupplyController],
})
export class SupplyModule {}
