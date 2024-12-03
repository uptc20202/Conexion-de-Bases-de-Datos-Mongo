import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleStatusPagesComponent } from './sale-status.pages.component';

describe('SaleStatusPagesComponent', () => {
  let component: SaleStatusPagesComponent;
  let fixture: ComponentFixture<SaleStatusPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleStatusPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleStatusPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
