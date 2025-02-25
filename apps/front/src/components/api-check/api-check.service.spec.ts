import { TestBed } from '@angular/core/testing';

import { ApiCheckService } from './api-check.service';

describe('ApiCheckService', () => {
  let service: ApiCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
