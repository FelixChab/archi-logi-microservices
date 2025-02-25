import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestFormComponent } from './supply-request-form.component';

describe('SupplyRequestFormComponent', () => {
  let component: SupplyRequestFormComponent;
  let fixture: ComponentFixture<SupplyRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
