import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2BuyComponent } from './step2-buy.component';

describe('Step2BuyComponent', () => {
  let component: Step2BuyComponent;
  let fixture: ComponentFixture<Step2BuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step2BuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2BuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
