import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { RequiredSupplyDto, SupplyInputDto } from './dto/supply.dto';

@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

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

  @Post()
  @HttpCode(204)
  getSupplyStock(@Body() supplyInputDto: SupplyInputDto) {
    return this.supplyService.handleSupply(supplyInputDto);
  }
}
