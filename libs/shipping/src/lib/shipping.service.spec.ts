import { Test } from '@nestjs/testing';
import { ShippingService } from './shipping.service';

describe('ShippingService', () => {
  let service: ShippingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ShippingService],
    }).compile();

    service = module.get(ShippingService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
