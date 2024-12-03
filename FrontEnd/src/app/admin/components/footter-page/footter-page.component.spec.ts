import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootterPageComponent } from './footter-page.component';

describe('FoodPageComponent', () => {
  let component: FootterPageComponent;
  let fixture: ComponentFixture<FootterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
