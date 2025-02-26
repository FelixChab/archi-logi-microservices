import { Controller, Get } from '@nestjs/common';

@Controller('ping')
export class SupplyController {
  @Get()
  ping() {
    return 'pong';
  }
}
