import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePatientAppointmentsComponent } from './table-patient-appointments.component';

describe('TablePatientAppointmentsComponent', () => {
  let component: TablePatientAppointmentsComponent;
  let fixture: ComponentFixture<TablePatientAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePatientAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePatientAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
