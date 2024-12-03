import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsUserListPagesComponent } from './jobs-user-list.pages.component';

describe('JobsUserListPagesComponent', () => {
  let component: JobsUserListPagesComponent;
  let fixture: ComponentFixture<JobsUserListPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsUserListPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsUserListPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
