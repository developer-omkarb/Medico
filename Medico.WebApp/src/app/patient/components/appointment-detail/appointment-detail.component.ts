import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SidemenudummyData, SidemenuItem } from '../../../shared/models/sidemenu.model';
import { AppointmentModel } from '../../models/appointments-model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css'],
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
export class AppointmentDetailComponent implements OnInit {
  appointmentId: number;
  noOfNotifications:Number
  appointmentDetails: AppointmentModel;
  sidemenu_items: Array<SidemenuItem> = SidemenudummyData
  showVisitHistory: boolean = false;
  backUrl: string;
  patientId: number;
  patientName: string;
  btnHistoryText: string;
  constructor(private route: ActivatedRoute, private service: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.appointmentId = parseInt(params["id"]);
      this.getAppointmentDetails();
    });
    const userDetails = JSON.parse(sessionStorage.getItem("user"));
    //this.username = userDetails.email;
    const prevPath = sessionStorage.getItem("prevPath");
    if (userDetails.role == "Patient") {
      if(prevPath == null){
        this.backUrl = "/patient/dashboard/home";
      }else{
        this.backUrl = prevPath;
      }
      this.btnHistoryText = "View History";
    } else if (userDetails.role == "Nurse") {
      this.backUrl = "/nurse/dashboard/home";
      this.btnHistoryText = "View Patient History";
    } else if (userDetails.role == "Physician") {
      this.backUrl = "/physician/dashboard/home";
      this.btnHistoryText = "View Patient History";
    }
    this.sidemenu_items = SidemenudummyData.filter(x => x.role.toLowerCase() == userDetails.role.toLowerCase());
  }

  getAppointmentDetails() {
    this.service.getAppointmentById(this.appointmentId).subscribe((res:AppointmentModel)=>{
      console.log('RESULT',res)
      this.appointmentDetails = res;
      this.patientId = this.appointmentDetails.patientid;
      this.patientName = this.appointmentDetails.patient.person.firstname + " " + this.appointmentDetails.patient.person.lastname;
      console.log("appointments", this.appointmentDetails);
    });
  }
  viewVisitHistory() {
    this.showVisitHistory = true;
  }
  ClosePopUp(event) {
    this.showVisitHistory = false;
  }
  notificaionCountEvent(notificationCount:number){
    this.noOfNotifications = notificationCount
  }
  //#region  Toggle Side Notification Tab
  openNav(){
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  }
  closeNav(){
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  ontoogleNotifiationTab(shownotificationTab : boolean){
    if(shownotificationTab == true){
      this.openNav()
    }
    else{
      this.closeNav()
    }
  }
}
