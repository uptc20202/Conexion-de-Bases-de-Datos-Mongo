import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguePagesComponent } from './catalogue.pages.component';

describe('CataloguePagesComponent', () => {
  let component: CataloguePagesComponent;
  let fixture: ComponentFixture<CataloguePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CataloguePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
