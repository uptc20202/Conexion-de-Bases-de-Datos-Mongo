import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsUserDetailComponent } from './jobs-user-detail.component';

describe('JobsUserDetailComponent', () => {
  let component: JobsUserDetailComponent;
  let fixture: ComponentFixture<JobsUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsUserDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
