import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductPagesComponent } from './create-product.pages.component';

describe('CreateProductPagesComponent', () => {
  let component: CreateProductPagesComponent;
  let fixture: ComponentFixture<CreateProductPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
