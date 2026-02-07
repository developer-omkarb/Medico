import { Component, OnInit } from '@angular/core';
import { parseDate } from 'ngx-bootstrap';
import { HospitalUsers } from 'src/app/admin/models/hospital-user-model';
import { AuthService } from 'src/app/auth.service';
import { SidemenudummyData, SidemenuItem } from 'src/app/shared/models/sidemenu.model';
import { AppointmentStatus, Appointmnents } from '../../models/appointments-model';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {
  sidemenu_items: Array<SidemenuItem> = SidemenudummyData;
  doctorName: string;

  appointmentDate: Date;

  status: string;

  appointments: Appointmnents[];

  doctors: HospitalUsers[];
  originalList: Appointmnents[];

  currentDate: Date = new Date();

  constructor(private service: AuthService) { }

  triggerCSS(event: Event) {
    const InputField = event.target as HTMLInputElement
    InputField.previousElementSibling.className = "labeltransform"
  }

  removeCSS(event: Event) {
    const InputField: HTMLInputElement = event.target as HTMLInputElement

    if (InputField.value == "")
      InputField.previousElementSibling.className = "form-label"
    else
      InputField.previousElementSibling.className = "labeltransform"
  }

  ngOnInit(): void {
    this.getAppointments();
  }
  setAppointmentstatus() {
    //this.appointments.forEach(x => {
    //  if (x.appointmentstatusid == appointmentstatus.Confirmed) {
    //    x.appointmentstatus = "Confirmed";
    //  }
    //  else if (x.appointmentstatusid == AppointmentStatus.Declined) {
    //    x.appointmentstatus = "Declined";
    //  }
    //});
  }
  getAppointments() {
    //this.service.getAppointments().subscribe((response: Appointmnents[]) => {
    //  this.appointments = response;
    //  this.originalList = response;
    //  this.setAppointmentstatus();
    //  //this.getDoctors();
    //});
  }

  //getDoctors() {
  //  this.service.getDoctors().subscribe((response: HospitalUsers[]) => {
  //    this.doctors = response;
  //    this.setDoctorNames();
  //  });
  //}

  setDoctorNames() {
    this.appointments.forEach(x => {
      x.physicianName = this.doctors.find(d => d.id == x.physicianid).doctorname;
    });
  }

  searchAppointments() {
    this.appointments = this.originalList;
    let selectedAppointments: Appointmnents[];
    selectedAppointments = this.appointments;
    if (this.doctorName != "" && this.doctorName != null) {
      selectedAppointments = selectedAppointments.filter(x => x.physicianName.toLowerCase().includes(this.doctorName.toLowerCase()));
    }
    if (this.appointmentDate != null) {
      selectedAppointments = selectedAppointments.filter(x => parseDate(x.appointmentdate.toString()).toLocaleDateString() == parseDate(this.appointmentDate).toLocaleDateString());
    }
    if (this.status != "" && this.status != null) {
      selectedAppointments = selectedAppointments.filter(x => x.appointmentstatus == this.status);
    }
    if (selectedAppointments != null)
      this.appointments = selectedAppointments;
  }
  reset() {
    this.appointmentDate = null;
    this.doctorName = "";
    this.status = "";
  }
}
