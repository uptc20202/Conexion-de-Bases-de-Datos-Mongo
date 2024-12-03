import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyOfferPagesComponent } from './apply-offer.pages.component';

describe('ApplyOfferPagesComponent', () => {
  let component: ApplyOfferPagesComponent;
  let fixture: ComponentFixture<ApplyOfferPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyOfferPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyOfferPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
