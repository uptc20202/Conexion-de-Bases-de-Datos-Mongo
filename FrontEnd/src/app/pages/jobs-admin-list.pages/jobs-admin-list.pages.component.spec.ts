import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAdminListPagesComponent } from './jobs-admin-list.pages.component';

describe('JobsAdminListPagesComponent', () => {
  let component: JobsAdminListPagesComponent;
  let fixture: ComponentFixture<JobsAdminListPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsAdminListPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsAdminListPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
