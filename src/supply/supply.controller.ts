import { Controller, Get, HttpCode } from '@nestjs/common';
import { SupplyService } from './supply.service';

@Controller('supply')
export class SupplyController {
  constructor(private supplyService: SupplyService) {}

  @Get('ping')
  ping() {
    return this.supplyService.ping();
  }

  @Get('summary')
  @HttpCode(200)
  summary() {
    return this.supplyService.summary();
  }
}
