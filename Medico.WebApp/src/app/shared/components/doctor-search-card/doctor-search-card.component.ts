import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { phyinfo } from 'src/app/patient/models/phyinfo.model';
import { KeyValModel } from '../../models/keyval.model';
import { UtilService } from '../../service/utility.service';
@Component({
  selector: 'app-doctor-search-card',
  templateUrl: './doctor-search-card.component.html',
  styleUrls: ['./doctor-search-card.component.css']
})
export class DoctorSearchCardComponent implements OnInit,OnChanges {
  @Input() phyInfo:phyinfo = docDummyInfo
  @Input() searchDateVal:any
  ShowNoAppointmentAvailableForSunday:boolean=false
  ShowAllAppointmetsBooked:boolean=false
  showAppointmentButton:boolean=true
  isRoleNotPatient:boolean=false
  patients:KeyValModel[] =[]
  AvailableAppointments : any
  selectedApInfo:selectedAppInfo = {selecteddate : "",selectedslotid : 0,selectedslottime:"",phyid : 0 ,phyname : "",appointmentTitle:""}
  
  showApproveDialog = false
  

  appointmentTitleControl = new FormControl('', [Validators.required,Validators.minLength(10)]);
  patient = new FormControl('', [Validators.required]);
  appointmentTitleForm: FormGroup;
  constructor(private auth: AuthService, private util: UtilService, private fb: FormBuilder, private route: Router) {
      this.appointmentTitleForm =fb.group({
        appointmentTitleControl : this.appointmentTitleControl,
        patient:this.patient
      })
   }
  ngOnChanges(changes: SimpleChanges): void {
    if((new Date(this.searchDateVal).getDay() != 0)){//if not sunday load appointments
      this.loadAppointments()
    }
    else{
      this.ShowNoAppointmentAvailableForSunday = true
      this.showAppointmentButton =false
    }
    
  }

  ngOnInit(): void {
  }
  
  BookAppClick(phyid,phyname){
    if(this.selectedApInfo.selectedslotid == 0){
      this.util.showWarning('Please Select a Time Slot to go Further with Appointment')
      this.showApproveDialog = false
    }
    else{
      this.selectedApInfo.phyid = phyid.innerHTML
      this.selectedApInfo.phyname = phyname.innerText
      this.showApproveDialog = true
      this.auth.CheckAppointmentConflict(this.util.getStrDate(new Date(this.searchDateVal)),this.selectedApInfo.selectedslotid).subscribe((res:boolean)=>{
        if(res == true){
          this.util.showWarning('NOTE : There is another Appointment At Same Date and Time.')
        }
      })
      var user = this.util.getUserFromSession()
      if(user.role != "Patient"){
        this.isRoleNotPatient = true
        this.auth.GetAllPatientsForDropDown().subscribe((res:KeyValModel[])=>{
          this.patients = res
        })
        
      }
      else{
        let tempobjforkeyval:KeyValModel ={key : 1,value:user.fullName};
        this.patients.push(tempobjforkeyval)
        this.appointmentTitleForm.patchValue({ appointmentSlot: Number(this.selectedApInfo.phyid)});
          this.appointmentTitleForm.patchValue({patient:1})
        }
      //IF DEMOGRAPHIC INFO IS COMPLETE
      //ELSE
      // window.open('')
    }
    
  }
  onTimeSlotSelected(value :any,target:EventTarget,slots:HTMLDivElement) {
    
    const btn = target as HTMLButtonElement
    const buttons  = slots.childNodes
    let ele
    buttons.forEach((element)=>{
      ele = element as HTMLButtonElement
      ele.value
      if(ele.value == value){
          if(value == this.selectedApInfo.selectedslotid){
            ele.classList.remove("text-light")
            ele.classList.remove("btn-info")
            this.ClearSelectedSlotInfo()
          }
          else{
            ele.classList.add("text-light")
            ele.classList.add("btn-info")
            this.selectedApInfo.selectedslotid = value
            this.selectedApInfo.selecteddate = this.util.getStrDate(new Date(this.searchDateVal))
            this.selectedApInfo.selectedslottime = ele.innerHTML
          }
      }
      else{
        if(ele.classList!=undefined){
          ele.classList.remove("text-light")
          ele.classList.remove("btn-info")
        }
      }
    })
    }
  AppointmentDataChange(){
    this.loadAppointments()
  }
  private loadAppointments(){
    const date = this.util.getStrDate(new Date(this.searchDateVal))
    
    this.auth.GetAvaiableAppointment(this.phyInfo.phyId,date).subscribe((response:any)=>{
      if(response.length == 0){this.setAppointmentSlotsFull()}
      this.AvailableAppointments=response
    })
  }
  CreateAppointment(){
    this.util.showOrRemoveLoader(true);
    let userid:string
    let userdata = this.util.getUserFromSession()
    if(this.isRoleNotPatient){
      userid = this.patient.value
    }
    else{
      userid = userdata.userid
    }
    
    this.auth.checkIfPatientProfileCompleted(userid).then((res:boolean)=>{
      if(res == false)
      {
        if(userdata.role != 'Patient'){
                  this.util.showDanger('Cannot Book Appointment as Profile Is Not Complete. Please Complete Before Booking')
                }
                else{
                  this.util.showDanger('Please Complete Your Profile Before Booking an Appointment')
                }
      }
      this.util.showOrRemoveLoader(false);
    })
    this.auth.createAppointment({userId : userid,appointmentTitle :this.appointmentTitleControl.value, phyId : Number(this.selectedApInfo.phyid), selectedDate : this.selectedApInfo.selecteddate, selectedSlotId : this.selectedApInfo.selectedslotid}).then(
            response=>{
              this.util.showOrRemoveLoader(false);
              this.util.showSuccess('Appointment Created Successfully...')
              this.loadAppointments()
              this.showApproveDialog = false
              this.appointmentTitleForm.reset()
              this.selectedApInfo.selectedslotid = 0
              setTimeout(x => {
                if (userdata.role == "Patient") {
                  this.route.navigate(["/patient/dashboard/home"]);
                }
                else {
                  this.route.navigate(["/nurse/dashboard/home"]);
                }
              }, 2000);
            }
          )
  }
  setInfoWhenSunday(){

  }
  setAppointmentSlotsFull() {
    this.ShowAllAppointmetsBooked = true
    this.showAppointmentButton = false
  }
  CancelAppointment(){
    this.showApproveDialog = false
  }

  ClearSelectedSlotInfo(){
    this.selectedApInfo = {selecteddate : "",selectedslotid : 0,selectedslottime:"",phyid : 0 ,phyname : "",appointmentTitle:""}
  }
}

export interface selectedAppInfo{
  phyid : number
  phyname:string
  appointmentTitle:string
  selectedslotid:number
  selecteddate:string
  selectedslottime:string
}
const docDummyInfo:any ={
  image:"",
  doctorid:"12987",
  name:"Dr. Aman Shetty",
  spacialities:"Dentist, Implantologist",
  experience:"24 Years Experience Overall",
  score:"98%",
  totalreviews:"1200",
  location:"Navi Mumbai, Thane"
}
