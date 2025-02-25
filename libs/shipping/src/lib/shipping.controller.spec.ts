import { Test } from '@nestjs/testing';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';

describe('ShippingController', () => {
  let controller: ShippingController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ShippingService],
      controllers: [ShippingController],
    }).compile();

    controller = module.get(ShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
