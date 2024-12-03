import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsTopComponent } from './ads-top.component';

describe('AdsTopComponent', () => {
  let component: AdsTopComponent;
  let fixture: ComponentFixture<AdsTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
