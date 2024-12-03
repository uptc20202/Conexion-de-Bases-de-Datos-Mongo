import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsPagesComponent } from './maps.pages.component';

describe('MapsPagesComponent', () => {
  let component: MapsPagesComponent;
  let fixture: ComponentFixture<MapsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
