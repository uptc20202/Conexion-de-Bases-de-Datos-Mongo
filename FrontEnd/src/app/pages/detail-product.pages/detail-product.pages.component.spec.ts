import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductPagesComponent } from './detail-product.pages.component';

describe('DetailProductPagesComponent', () => {
  let component: DetailProductPagesComponent;
  let fixture: ComponentFixture<DetailProductPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProductPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProductPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
