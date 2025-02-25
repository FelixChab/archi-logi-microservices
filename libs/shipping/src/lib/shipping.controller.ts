import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ShippingService } from './shipping.service';
import { ShippingRequestDto } from "@log/contracts";

@Controller('shipping')
export class ShippingController {
  constructor(private shippingService: ShippingService) {}

  @Get('ping')
  ping() {
    return 'pong';
  }

  @Post()
  @HttpCode(204)
  requestShipping(@Body() request: ShippingRequestDto) {

  }
}
