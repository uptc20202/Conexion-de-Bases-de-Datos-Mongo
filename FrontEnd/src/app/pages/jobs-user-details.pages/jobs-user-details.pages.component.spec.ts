import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsUserDetailsPagesComponent } from './jobs-user-details.pages.component';

describe('JobsUserDetailsPagesComponent', () => {
  let component: JobsUserDetailsPagesComponent;
  let fixture: ComponentFixture<JobsUserDetailsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsUserDetailsPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsUserDetailsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
