import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressPagesComponent } from './address.pages.component';

describe('AddressPagesComponent', () => {
  let component: AddressPagesComponent;
  let fixture: ComponentFixture<AddressPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
