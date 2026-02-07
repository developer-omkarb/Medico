import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth.service';
import { AppointmnentsEditModel } from '../../models/appointmnentsedit.model';
import { KeyValModel } from '../../models/keyval.model';
import { UtilService } from '../../service/utility.service';

@Component({
  selector: 'app-edit-appointment-table',
  templateUrl: './edit-appointment-table.component.html',
  styleUrls: ['./edit-appointment-table.component.css']
})
export class EditAppointmentTableComponent implements OnInit, OnChanges {
  selectedTableRow:any
  @Input() tableHeaderText: string = ""
  @Input() allowSearch:boolean = true
  @Input() searchedText:string = ""
  //ROLES TO DECIDE THE VIEW
  isRolePatient:boolean
  isRoleNurse:boolean
  isRolePhysician:boolean
  showAppointmenEditDialog:boolean = false
  appointments: AppointmnentsEditModel[]=[]
  tempAppointmentsStorage : AppointmnentsEditModel[]=[]
  
  @ViewChild('apptTable') aaptTable: DatatableComponent
  table_page_size = 10

  

  

  constructor(private fb:FormBuilder,private authSrvc: AuthService,private route:Router,private utilService:UtilService) {
     
   }
  ngOnChanges(changes: SimpleChanges): void {
    //Resetting the filter to apply new filter according to he search text
    this.appointments = this.tempAppointmentsStorage
    //Applying Filter
    this.appointments = this.appointments.filter(x => (
    x.appointmentTitle.toUpperCase().includes(this.searchedText.toUpperCase())||
    x.physicianName.toUpperCase().includes(this.searchedText.toUpperCase())))
  }

  ngOnInit(): void {
      this.SetRoleParameterForView()
      this.getAppointments();
  }
  SetRoleParameterForView() {
    var user = this.utilService.getUserFromSession()
    if(user.role == "Patient"){
      this.isRolePatient = true
    }
    else if(user.role == "Nurse"){
      this.isRoleNurse = true
    }
    else if(user.role == "Physician"){
      this.isRolePhysician = true
    }
  }

  getAppointments() {
    this.authSrvc.getAppointmentsForEdit().subscribe(res => {
      this.appointments = res;
      //Storing the actual data from database to reset the filter
      this.tempAppointmentsStorage = this.appointments
    });
  }
  
  redirectToAppointmentDetails(valObj: any){
    this.route.navigate(['/patient/appointment-details/'+ valObj])
  }

  onCloseAppointmentPromptEvent(val:boolean){
    this.showAppointmenEditDialog = false
    this.getAppointments();
  }
  edit(selectedTableRow){
    this.showAppointmenEditDialog = true
    this.selectedTableRow =selectedTableRow
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
  showPopover(event: Event, errParentNode: HTMLElement) {
    this.utilService.showPopoverCopy(event,errParentNode)
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

export const DefaultAppointmentData={
  appointmentDate: "2022-04-14T00:00:00",
appointmentId: 71,
appointmentStatus: "Awaited",
appointmentStatusId: 3,
appointmentTime: "12:00",
appointmentTitle: "Sore throt",
createdBy: "vampire.g.1499@gmail.com",
createdDate: "2022-04-01T00:00:00",
description: null,
modifiedBy: null,
modifiedDate: null,
nurseId: null,
nurseName: "Not Assigned",
patientId: 1,
patientName: "vampire G1499",
physicianId: 9,
physicianName: "Meenakshi Sinha",
timeslotId: 3,
rejectCancelReason:""
}
