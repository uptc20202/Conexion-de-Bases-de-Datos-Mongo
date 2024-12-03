import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkPurchaseComponent } from './bulk-purchase.component';

describe('BulkPurchaseComponent', () => {
  let component: BulkPurchaseComponent;
  let fixture: ComponentFixture<BulkPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
