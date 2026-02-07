import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { parseDate } from 'ngx-bootstrap';
import { HospitalUsers } from 'src/app/admin/models/hospital-user-model';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { AppointmentStatus, Appointmnents } from '../../models/appointments-model';
import { PatientAppointmentsViewModel } from '../../models/patientappointmentsview.model';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  @Input() showForWeek: boolean = false;
  @Input() tableHeaderText: string = ""
  @Input() allowSearch: boolean = true
  @Input() allowSearchByDate: boolean = true;
  showStatus :boolean =false
  appointments: PatientAppointmentsViewModel[]

  @ViewChild('apptTable') aaptTable: DatatableComponent;
  table_page_size = 10

  tempAppointmentsStorage : PatientAppointmentsViewModel[];

  constructor(private authSrvc: AuthService, private route: Router, private utilService: UtilService, private active: ActivatedRoute) { }
  ngOnInit(): void {
    if (this.showForWeek) {
      this.getWeekAppointments();
    }
    else{
      this.getPatientAppointmentsById();
    }
    if(this.showForWeek ==true){
      this.showStatus = true
    }
  }
  searchTextChanged(searchedText:string){
    this.appointments = this.tempAppointmentsStorage
    this.appointments = this.appointments.filter(x => (
    x.physicianName.toUpperCase().includes(searchedText.toUpperCase()) ))
  }

  getWeekAppointments() {
    this.authSrvc.getPatientAppointmentsByWeekDay(this.utilService.getStrDate(new Date())).subscribe(res => {
      this.appointments = res;
      var curr = new Date;
      var first = curr.getDate() - curr.getDay();
      var last = first + 6;

      var firstday = new Date(curr.setDate(first));
      var lastday = new Date(curr.setDate(last));
      var result = this.appointments.filter(x => parseDate(x.appointmentDate.toString()) >= firstday && parseDate(x.appointmentDate) <= lastday);
      // this.appointments = result;
      this.tempAppointmentsStorage = this.appointments
    });
  }
  getPatientAppointmentsById() {
    this.authSrvc.getPatientAppointmentsById().subscribe(res => {
      console.log('Appointmtnsa',res)
      this.appointments = res
      this.tempAppointmentsStorage = this.appointments
    })
  }
  redirectToAppointmentDetails(valObj: any) {
      const activePath = this.route.url;
      sessionStorage.setItem("prevPath", activePath);
    this.route.navigate(['/patient/appointment-details/'+ valObj])
  }
  filterByDate(event) {
    setTimeout(() => {
      this.appointments = this.tempAppointmentsStorage;
      if (event.target.value != "") {
        this.appointments = this.appointments.filter(x => (
          new Date(x.appointmentDate).toDateString() == new Date(event.target.value).toDateString()));
      }
    }, 400);
  }
  getRowClass(row) {
    if(row.appointmentStatus =='Awaited'){
      return {
        'b-awaited bold': 0 === 0
      };      
    }
    else if(row.appointmentStatus =='Declined'){
      return {
        'b-declined bold': 0 === 0
      };      
    }
    else if(row.appointmentStatus =='Confirmed'){
      return {
        'b-confirmed bold': 0 === 0
      };      
    }
    else if(row.appointmentStatus =='Cancelled'){
      return {
        'b-cancelled bold': 0 === 0
      };      
    }
    else if(row.appointmentStatus =='Visited'){
      return {
        'b-visited bold': 0 === 0
      };      
    }

  }
  getCellClass({ row, column, value }): any {
    // return {
    //   'ellipsis': 0 === 1
    // };
  }
}
