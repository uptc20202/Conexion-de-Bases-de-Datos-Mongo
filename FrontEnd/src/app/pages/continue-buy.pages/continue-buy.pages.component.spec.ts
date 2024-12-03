import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueBuyPagesComponent } from './continue-buy.pages.component';

describe('ContinueBuyPagesComponent', () => {
  let component: ContinueBuyPagesComponent;
  let fixture: ComponentFixture<ContinueBuyPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueBuyPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinueBuyPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
