import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth.service';
import { AppointmnentsEditModel } from 'src/app/shared/models/appointmnentsedit.model';
import { KeyValModel } from 'src/app/shared/models/keyval.model';
import { UtilService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-table-patient-appointments',
  templateUrl: './table-patient-appointments.component.html',
  styleUrls: ['./table-patient-appointments.component.css']
})
export class TablePatientAppointmentsComponent implements OnInit {
  @Input() appointments: AppointmnentsEditModel[]
  @Input() showForWeek: boolean = false;

  @ViewChild('apptTable') aaptTable: DatatableComponent;
  table_page_size = 10
  showAppointmenEditDialog:boolean = false
  selectedTableRow:any
  tempAppointmentsStorage: AppointmnentsEditModel[];
  isUserPhysician: boolean=false;

  constructor(private authSrvc: AuthService,private route:Router,private utilService:UtilService) { }
  ngOnInit(): void {
    if (this.showForWeek) {
      this.getWeekAppointments();
    }
    var userDetails = this.utilService.getUserFromSession();
    if (userDetails != null) {
      this.isUserPhysician = userDetails.role == "Physician" ? true : false;
      console.log("Is user doc", this.isUserPhysician);
    }
  }
  searchTextChanged(searchedText:string){
    //Resetting the filter to apply new filter according to he search text
    this.appointments = this.tempAppointmentsStorage
    //Applying Filter
    this.appointments = this.appointments.filter(x => (
    x.patientName.toUpperCase().includes(searchedText.toUpperCase()) ||
    x.physicianName.toUpperCase().includes(searchedText.toUpperCase()) ))
  }

  getWeekAppointments() {
    this.authSrvc.getAppointmentsByWeekDay(this.utilService.getStrDate(new Date())).subscribe(res => {
      console.log('Result',res)
      this.appointments = res;
      //Storing the actual data from database to reset the filter
      this.tempAppointmentsStorage = this.appointments
    });
  }
  redirectToAppointmentDetails(valObj: any) {
    window.open('/patient/appointment-details/' + valObj.appointmentId, '_self');
  }
  AddAppointmentDetails(row){
    window.open('/patient/dashboard/patient-visit-details/'+ row.appointmentId, '_self');
  }
  ModifyAppointment(selectedRow){
    console.log(selectedRow)
    this.showAppointmenEditDialog = true
    this.selectedTableRow =selectedRow
  }
  onCloseAppointmentPromptEvent(val:boolean){
    this.showAppointmenEditDialog = false
    if (this.showForWeek) {
      this.getWeekAppointments();
    }
  }
  Cancel(appointmentId){
    this.authSrvc.checkAppointmentStatusForCancellation(appointmentId).subscribe(
      (canCancel:KeyValModel)=>{
        if(canCancel.key==0)
        {
          this.utilService.showDanger(canCancel.value)
          return 
        }
        else{
          const result = confirm('Are You Sure You Want To Cancel this Appointment?')
          if(result){
            this.authSrvc.CancelAppointment(appointmentId).subscribe(
              x=>{
                this.utilService.showSuccess('Appointment Cancelled...')
              }
            )
          }
        }
      })
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
