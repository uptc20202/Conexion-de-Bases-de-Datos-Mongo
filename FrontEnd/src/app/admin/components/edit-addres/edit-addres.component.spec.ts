import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddresComponent } from './edit-addres.component';

describe('EditAddresComponent', () => {
  let component: EditAddresComponent;
  let fixture: ComponentFixture<EditAddresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
