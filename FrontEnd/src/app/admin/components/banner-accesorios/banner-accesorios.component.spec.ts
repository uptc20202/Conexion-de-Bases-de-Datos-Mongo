import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAccesoriosComponent } from './banner-accesorios.component';

describe('BannerAccesoriosComponent', () => {
  let component: BannerAccesoriosComponent;
  let fixture: ComponentFixture<BannerAccesoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerAccesoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerAccesoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
