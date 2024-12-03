import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishBuyNoLoginComponent } from './finish-buy-no-login.component';

describe('FinishBuyNoLoginComponent', () => {
  let component: FinishBuyNoLoginComponent;
  let fixture: ComponentFixture<FinishBuyNoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishBuyNoLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishBuyNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
