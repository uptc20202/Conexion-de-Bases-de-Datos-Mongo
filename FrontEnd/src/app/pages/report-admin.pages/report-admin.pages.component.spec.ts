import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdminPagesComponent } from './report-admin.pages.component';

describe('ReportAdminPagesComponent', () => {
  let component: ReportAdminPagesComponent;
  let fixture: ComponentFixture<ReportAdminPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAdminPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAdminPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
