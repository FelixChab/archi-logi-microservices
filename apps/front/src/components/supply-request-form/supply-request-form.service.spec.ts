import { TestBed } from '@angular/core/testing';

import { SupplyRequestFormService } from './supply-request-form.service';

describe('SupplyRequestFormService', () => {
  let service: SupplyRequestFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplyRequestFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
