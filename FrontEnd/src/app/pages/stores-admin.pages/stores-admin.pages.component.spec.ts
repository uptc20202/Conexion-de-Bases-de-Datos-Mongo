import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresAdminPagesComponent } from './stores-admin.pages.component';

describe('StoresAdminPagesComponent', () => {
  let component: StoresAdminPagesComponent;
  let fixture: ComponentFixture<StoresAdminPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresAdminPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoresAdminPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
