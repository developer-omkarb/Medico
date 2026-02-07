import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { AppointmentModel } from '../../../patient/models/appointments-model';

@Component({
  selector: 'app-doctor-appointment-detail',
  templateUrl: './doctor-appointment-detail.component.html',
  styleUrls: ['./doctor-appointment-detail.component.css'],
  styles: [
    `
      :host .tooltip-inner {
        background-color: white;
        color: black;
      }
      :host .tooltip.top .tooltip-arrow:before,
      :host .tooltip.top .tooltip-arrow {
        border-top-color: #009688;
      }
    `
  ]
})
export class DoctorAppointmentDetailComponent implements OnInit {
  appointmentId: number;
  appointmentDetails: AppointmentModel;
  @Output()

  onCloseEvent = new EventEmitter<any>();

  @Input()
  selectedUser: any;
  showVisitHistory: boolean = false;
  backUrl: string;
  patientId: number;
  patientName: string;
  btnHistoryText: string;
  constructor(private route: ActivatedRoute, private service: AuthService) { }

  ngOnInit(): void {
    if (this.selectedUser) {
      this.appointmentId = this.selectedUser.appointmentid;
      this.getAppointmentDetails();
    }
    else {
      this.route.params.subscribe((params: any) => {
        this.appointmentId = parseInt(params["id"]);
        this.getAppointmentDetails();
      });
    }
    const userDetails = JSON.parse(sessionStorage.getItem("user"));
    //this.username = userDetails.email;
    const prevPath = sessionStorage.getItem("prevPath");
    if (userDetails.role == "Patient") {
      this.backUrl = prevPath;
      this.btnHistoryText = "View History";
    } else if (userDetails.role == "Nurse") {
      this.backUrl = "/nurse/dashboard/home";
      this.btnHistoryText = "View Patient History";
    } else if (userDetails.role == "Physician") {
      this.backUrl = "/physician/dashboard/home";
      this.btnHistoryText = "View Patient History";
    }
  }

  getAppointmentDetails() {
    this.service.getAppointmentById(this.appointmentId).subscribe((res: AppointmentModel) => {
      this.appointmentDetails = res;
      this.patientId = this.appointmentDetails.patientid;
      this.patientName = this.appointmentDetails.patient.person.firstname + " " + this.appointmentDetails.patient.person.lastname;
      this.getDoctor();
    });
  }
  getDoctor(){
    this.service.getDemographicDetailsById(this.appointmentDetails.physician.employeeid).subscribe(res=>{
      this.appointmentDetails.doctorname=res.firstname + " "+res.lastname;
    });
  }
  viewVisitHistory() {
    this.showVisitHistory = true;
  }
  closePopUp() {

    this.onCloseEvent.emit();



    console.log("close");

  }
  CloseHistoryPopUp(event) {
    this.showVisitHistory = false;
  }
}
