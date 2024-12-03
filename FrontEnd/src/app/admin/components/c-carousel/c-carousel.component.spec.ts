import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCarouselComponent } from './c-carousel.component';

describe('CCarouselComponent', () => {
  let component: CCarouselComponent;
  let fixture: ComponentFixture<CCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
