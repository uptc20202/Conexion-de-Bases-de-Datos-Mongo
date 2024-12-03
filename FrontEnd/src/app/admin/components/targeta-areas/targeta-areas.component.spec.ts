import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetaAreasComponent } from './targeta-areas.component';

describe('TargetaAreasComponent', () => {
  let component: TargetaAreasComponent;
  let fixture: ComponentFixture<TargetaAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetaAreasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetaAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
