import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentTableComponent } from './edit-appointment-table.component';

describe('EditAppointmentTableComponent', () => {
  let component: EditAppointmentTableComponent;
  let fixture: ComponentFixture<EditAppointmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
