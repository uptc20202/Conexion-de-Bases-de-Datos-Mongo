import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleStateShippingComponent } from './circle-state-shipping.component';

describe('CircleStateShippingComponent', () => {
  let component: CircleStateShippingComponent;
  let fixture: ComponentFixture<CircleStateShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleStateShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleStateShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
