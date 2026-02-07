import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { AppointmnentsEditModel } from '../../models/appointmnentsedit.model';
import { KeyValModel } from '../../models/keyval.model';
import { UtilService } from '../../service/utility.service';
import { DefaultAppointmentData } from '../edit-appointment-table/edit-appointment-table.component';

@Component({
  selector: 'app-edit-appointment-form',
  templateUrl: './edit-appointment-form.component.html',
  styleUrls: ['./edit-appointment-form.component.css']
})
export class EditAppointmentFormComponent implements OnInit,OnChanges {
  @Input() selectedTableRow:any
  @Output() closeAppointmentPromptEvent = new EventEmitter<any>()
  isRolePatient:boolean
  //Drop down Data Containers
  patients:Array<KeyValModel>=[]
  physicians:Array<KeyValModel>=[]
  nurses:Array<KeyValModel>=[]
  appointmentSlots:Array<KeyValModel>=[]
  appointmentActions:Array<KeyValModel>=[]
  tempobjforkeyval:KeyValModel
  appointmentDateValue= this.utilService.getStrDate(new Date('mm/dd/yyyy'))
  tempAppointmentDetailsforSubmission : AppointmnentsEditModel = DefaultAppointmentData

  appointmentEditForm : FormGroup
  appointmentId =  new FormControl('',Validators.required)
  physician =  new FormControl('',Validators.required)
  physicianId =  new FormControl({value: '', disabled: true},Validators.required)
  nurse =  new FormControl('',Validators.required)
  appointmentSlot =  new FormControl('',Validators.required)
  patient =  new FormControl('',Validators.required)
  appointmentDate =  new FormControl('',Validators.required)
  appointmentTitle = new FormControl('',Validators.required)
  description = new FormControl('')
  appointmentAction = new FormControl('',Validators.required)
  createdBy = new FormControl({value: '', disabled: true},Validators.required)
  modifiedBy = new FormControl({value: '', disabled: true},Validators.required)
  modifiedReason = new FormControl('',Validators.required)
  constructor(private fb:FormBuilder,private authSrvc: AuthService,private route:Router,private utilService:UtilService) {
    this.appointmentEditForm = fb.group({
      appointmentId:this.appointmentId,
      physician:this.physician,
      physicianId:this.physicianId,
      nurse:this.nurse,
      appointmentSlot:this.appointmentSlot,
      patient:this.patient,
      appointmentDate:this.appointmentDate,
      appointmentTitle:this.appointmentTitle,
      description:this.description,
      appointmentAction:this.appointmentAction,
      createdBy:this.createdBy,
      modifiedBy:this.modifiedBy,
      modifiedReason:this.modifiedReason
    })
 }
  ngOnChanges(changes: SimpleChanges): void {
  }


  ngOnInit(): void {
    this.SetRoleParameterForView()
    this.edit(this.selectedTableRow)
  }
  SetRoleParameterForView() {
    var user = this.utilService.getUserFromSession()
    if(user.role == "Patient"){
      this.isRolePatient = true
    }
  }
  edit(selectedTableRow){
    console.log("Selected",selectedTableRow)
    this.tempAppointmentDetailsforSubmission.appointmentId = selectedTableRow.appointmentId
    this.tempAppointmentDetailsforSubmission.timeslotId = selectedTableRow.timeslotId
    this.tempAppointmentDetailsforSubmission.createdBy = selectedTableRow.createdBy

    this.appointmentEditForm.patchValue({ appointmentId: selectedTableRow.appointmentId})
    this.appointmentEditForm.patchValue({ appointmentTitle: selectedTableRow.appointmentTitle})
    this.tempobjforkeyval ={key : Number(selectedTableRow.patientId),value:selectedTableRow.patientName};
    this.patients.push(this.tempobjforkeyval)
    this.appointmentEditForm.patchValue({ patient: Number(selectedTableRow.patientId)})

    
    this.appointmentEditForm.patchValue({ appointmentDate: selectedTableRow.appointmentDate});
    this.appointmentEditForm.patchValue({ physicianId: selectedTableRow.physicianId});
    this.SetAvailableAppointmentsDrpDownVals(selectedTableRow)
    this.authSrvc.GetAllappointmentActionsForDropDown(selectedTableRow.appointmentId)
    .subscribe((res:Array<KeyValModel>)=>{
      if(res.length==0){
        this.appointmentEditForm.disable()
      }
      else{
        this.appointmentActions = res;
      }
    })
    

    this.appointmentEditForm.patchValue({ createdBy: selectedTableRow.createdBy});
    this.appointmentEditForm.patchValue({ modifiedBy: selectedTableRow.modifiedBy});
    this.appointmentEditForm.patchValue({ description: selectedTableRow.description});

    var user =this.utilService.getUserFromSession()
    if(this.isRolePatient){
      this.fillPatientEditForm(selectedTableRow)
    }
    else if(!this.isRolePatient){
      this.fillNurseEditFormForEmployee(selectedTableRow)
    }
    
    this.appointmentEditForm.patchValue({ modifiedReason: selectedTableRow.rejectCancelReason});
  }
  physicianSeleted(){
    this.appointmentEditForm.patchValue({ physicianId: this.physician.value});
    this.SetAvailableAppointmentsDrpDownVals('')
  }
  fillNurseEditFormForEmployee(selectedTableRow) {

    this.authSrvc.GetAllPhysiciansForDropDown().subscribe((res:Array<KeyValModel>)=>{
      this.physicians = res;
      this.appointmentEditForm.patchValue({ physician: Number(selectedTableRow.physicianId)});
    })
    this.authSrvc.GetAllNursesForDropDown().subscribe((res:Array<KeyValModel>)=>{
      this.nurses = res;
      if(this.nurses.filter(x=>x.key==Number(selectedTableRow.nurseId)).length !=0){
        this.appointmentEditForm.patchValue({ nurse: Number(selectedTableRow.nurseId)});
      }
      
    })
    
  }
  fillPatientEditForm(selectedTableRow) {
    this.tempobjforkeyval={key : Number(selectedTableRow.physicianId),value:selectedTableRow.physicianName};
    this.physicians.push(this.tempobjforkeyval)
    this.appointmentEditForm.patchValue({ physician: Number(selectedTableRow.physicianId)});
  }
  SetAvailableAppointmentsDrpDownVals(selectedTableRow) {
    console.log('physician',this.physicianId.value)
    this.authSrvc.GetAvaiableAppointment(this.physicianId.value,this.utilService.getStrDate(new Date(this.appointmentDate.value)))
    .subscribe((res:Array<KeyValModel>)=>{
      this.appointmentSlots = res;
      if(selectedTableRow != '' && selectedTableRow.appointmentDate == this.appointmentDate.value){
        this.tempobjforkeyval ={key : Number(selectedTableRow.timeslotId),value:selectedTableRow.appointmentTime};
        this.appointmentSlots.push(this.tempobjforkeyval)
        this.appointmentEditForm.patchValue({ appointmentSlot: Number(selectedTableRow.timeslotId)});
      }
      
    })
  }

  atAppointmentDateChange(){
    this.SetAvailableAppointmentsDrpDownVals('')  
  }
  UpdateAppointmentDetails(){
    console.log("Selected Row",this.selectedTableRow)
    console.log(this.appointmentEditForm)
    if(!this.appointmentTitle.valid ||
              !this.physician.valid ||
              !this.appointmentDate.valid || 
              !this.appointmentSlot.valid || 
              !this.appointmentAction.valid||
              !this.nurse.valid 
              ){
      this.utilService.showDanger('Please Specify All Required Fields')
      return
    }
    if(!this.checkIfAnyModificationDone()){return}
    
    if(!this.modifiedReason.valid){
      this.utilService.showDanger('Please Specify Modification Reason')
      return
    }
    this.tempAppointmentDetailsforSubmission.appointmentId=this.appointmentId.value
    this.tempAppointmentDetailsforSubmission.appointmentStatusId=this.appointmentAction.value
    this.tempAppointmentDetailsforSubmission.appointmentTitle=this.appointmentTitle.value
    this.tempAppointmentDetailsforSubmission.rejectCancelReason=this.modifiedReason.value
    this.tempAppointmentDetailsforSubmission.physicianId = this.physician.value
    this.tempAppointmentDetailsforSubmission.nurseId = this.nurse.value
    this.tempAppointmentDetailsforSubmission.description = this.description.value
    this.tempAppointmentDetailsforSubmission.appointmentDate = this.appointmentDate.value
    this.tempAppointmentDetailsforSubmission.timeslotId = this.appointmentSlot.value
    this.tempAppointmentDetailsforSubmission.patientId = this.selectedTableRow.patientId
    this.modifiedBy = (this.utilService.getUserFromSession()).fullName

    this.authSrvc.UpdateAppointmentDetails(this.tempAppointmentDetailsforSubmission).subscribe(
      x=>{
        this.closeAppointmentPrompt()
      }
      )
  }
  checkIfAnyModificationDone() {
    console.log(this.selectedTableRow)
    if(this.selectedTableRow.appointmentTitle  == this.appointmentTitle.value &&
      this.selectedTableRow.physicianId == this.physician.value &&
      this.selectedTableRow.appointmentDate ==  this.appointmentDate.value &&
      this.selectedTableRow.timeslotId == this.appointmentSlot.value &&
      this.selectedTableRow.appointmentStatusId == this.appointmentAction.value &&
      this.selectedTableRow.nurseId == this.nurse.value
      ){
        this.utilService.showWarning('Cannot Update. No Modification is done.')
        return false
      }
      else{
        return true;
      }
    
  }
  closeAppointmentPrompt(){
    this.closeAppointmentPromptEvent.emit(true)
  }
  showPopover(event: Event, errParentNode: HTMLElement) {
    this.utilService.showPopoverCopy(event, errParentNode);
  }
}
