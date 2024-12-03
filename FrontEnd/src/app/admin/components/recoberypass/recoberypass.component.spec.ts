import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoberypassComponent } from './recoberypass.component';

describe('RecoberypassComponent', () => {
  let component: RecoberypassComponent;
  let fixture: ComponentFixture<RecoberypassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoberypassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoberypassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
