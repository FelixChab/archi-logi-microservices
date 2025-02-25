import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyInputDto } from './supply.dto';

@Controller('supply')
export class SupplyController {
  constructor(private supplyService: SupplyService) {}

  @Get('ping')
  ping() {
    return this.supplyService.ping();
  }

  @Post('/api/supply')
  @HttpCode(204)
  async getSupplyStock(@Body() supplyInputDto: SupplyInputDto): Promise<void> {
    await this.supplyService.handleSupply(supplyInputDto);
  }
}
