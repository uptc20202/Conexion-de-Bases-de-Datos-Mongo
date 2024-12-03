import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAdminListComponent } from './jobs-admin-list.component';

describe('JobsAdminListComponent', () => {
  let component: JobsAdminListComponent;
  let fixture: ComponentFixture<JobsAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsAdminListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
