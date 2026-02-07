import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentDetailComponent } from './doctor-appointment-detail.component';

describe('AppointmentDetailComponent', () => {
  let component: DoctorAppointmentDetailComponent;
  let fixture: ComponentFixture<DoctorAppointmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorAppointmentDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppointmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
