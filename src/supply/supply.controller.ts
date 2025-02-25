import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { RequiredSupplyDto } from './supply.dto';

@Controller('supply')
export class SupplyController {
  constructor(private supplyService: SupplyService) {}

  @Get('ping')
  ping() {
    return this.supplyService.ping();
  }

  @Post('supply-needed')
  @HttpCode(204)
  async notifySuppliers(
    @Body() requiredSupplyDto: RequiredSupplyDto,
  ): Promise<void> {
    await this.supplyService.notifySuppliers(requiredSupplyDto);
  }
}
