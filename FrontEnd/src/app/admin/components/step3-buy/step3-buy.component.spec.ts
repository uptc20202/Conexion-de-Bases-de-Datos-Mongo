import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3BuyComponent } from './step3-buy.component';

describe('Step3BuyComponent', () => {
  let component: Step3BuyComponent;
  let fixture: ComponentFixture<Step3BuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step3BuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3BuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
