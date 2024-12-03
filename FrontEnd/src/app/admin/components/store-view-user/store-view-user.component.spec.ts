import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreViewUserComponent } from './store-view-user.component';

describe('StoreViewUserComponent', () => {
  let component: StoreViewUserComponent;
  let fixture: ComponentFixture<StoreViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreViewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
