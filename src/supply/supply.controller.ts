import { Controller, Get } from '@nestjs/common';
import { SupplyService } from './supply.service';

@Controller('supply')
export class SupplyController {
  constructor(private supplyService: SupplyService) {}

  @Get('ping')
  ping() {
    return this.supplyService.ping();
  }
}
