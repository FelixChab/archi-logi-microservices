import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyInputDto } from './dto/supply.dto';
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

  @Get('summary')
  @HttpCode(200)
  summary() {
    return this.supplyService.summary();
  }

  @Post('/api/supply')
  @HttpCode(204)
  async getSupplyStock(@Body() supplyInputDto: SupplyInputDto): Promise<void> {
    await this.supplyService.handleSupply(supplyInputDto);
  }
}
