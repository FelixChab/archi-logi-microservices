import { TestBed } from '@angular/core/testing';

import { ShoppingCatalogService } from './shopping-catalog.service';

describe('ShoppingCatalogService', () => {
  let service: ShoppingCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
