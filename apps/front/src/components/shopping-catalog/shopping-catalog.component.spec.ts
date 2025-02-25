import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCatalogComponent } from './shopping-catalog.component';

describe('ShoppingCatalogComponent', () => {
  let component: ShoppingCatalogComponent;
  let fixture: ComponentFixture<ShoppingCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
