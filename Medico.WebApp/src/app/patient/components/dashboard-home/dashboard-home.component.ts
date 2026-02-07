import { Component, OnInit } from '@angular/core';
import { HospitalUsers } from 'src/app/admin/models/hospital-user-model';
import { AuthService } from 'src/app/auth.service';
import { Vitals, VitalsdummyData } from 'src/app/shared/models/vitals.model';
import { AppointmentStatus, Appointmnents } from '../../models/appointments-model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  vitalsigns :Array<Vitals> = VitalsdummyData
  appointments: Appointmnents[];

  doctors: HospitalUsers[];
  originalList: Appointmnents[];
  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }
  //getAppointments() {
  //  this.service.getAppointments().subscribe((response: Appointmnents[]) => {
  //    this.appointments = response;
  //    this.originalList = response;
  //    this.setAppointmentstatus();
  //    //this.getDoctors();
  //  });
  //}
  //setAppointmentstatus() {
    //this.appointments.forEach(x => {
    //  if (x.appointmentstatusid == AppointmentStatus.Confirmed) {
    //    x.appointmentstatus = "Confirmed";
    //  }
    //  else if (x.appointmentstatusid == AppointmentStatus.Declined) {
    //    x.appointmentstatus = "Declined";
    //  }
    //});
  //}
  //getDoctors() {
  //  this.service.getDoctors().subscribe((response: HospitalUsers[]) => {
  //    this.doctors = response;
  //    this.setDoctorNames();
  //  });
  //}
  //setDoctorNames() {
  //  this.appointments.forEach(x => {
  //    x.physicianName = this.doctors.find(d => d.id == x.physicianid).doctorname;
  //  });
 // }
}
