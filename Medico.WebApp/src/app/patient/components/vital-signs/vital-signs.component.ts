import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UtilService } from 'src/app/shared/service/utility.service';
import { PatientVitalSigns, PatientVitalSignsDetails } from 'src/app/patient/models/patient-vital-signs-model';
import { AuthService } from 'src/app/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.css']
})
export class VitalSignsComponent implements OnInit {
  @ViewChild("saveButton", { static: false }) saveButton: ElementRef;
  @ViewChild("resetButton", { static: false }) resetButton: ElementRef;
  @ViewChild("popup", { static: true }) popup: ElementRef;

  @Input() appointmentId: any
  VitalSignsForm: FormGroup
  height = new FormControl('', [
    Validators.required,
    Validators.max(250)
  ]);

  weight = new FormControl('', [
    Validators.required,
  ]);

  bloodPressuresys = new FormControl('', [
    Validators.required,
  ]);

  bloodPressuredia = new FormControl('', [
    Validators.required,
  ]);

  bodyTemperature = new FormControl('', [
    Validators.required,
    Validators.max(109)
  ]);

  respirationRate = new FormControl('', [
    Validators.required,
  ]);

  vitalDescription = new FormControl('', [
  ]);

  constructor(fb: FormBuilder, private util: UtilService, private auth: AuthService,private modal : NgbModal) {
    this.VitalSignsForm = fb.group({
      height: this.height,
      weight: this.weight,
      bloodPressuresys: this.bloodPressuresys,
      bloodPressuredia: this.bloodPressuredia,
      bodyTemperature: this.bodyTemperature,
      respirationRate: this.respirationRate,
      vitalDescription: this.vitalDescription
    })
  }

  patientVitalSigns: PatientVitalSigns

  patientVitalSignDetails: PatientVitalSignsDetails[]


  saveVitalSignDetails(event: Event) {
    const saveBtn = event.target as HTMLButtonElement
    this.patientVitalSignDetails = [{
      vitalsignid: 1,
      name: "Body Temperature",
      value: this.bodyTemperature.value,
    },
    {
      vitalsignid: 2,
      name: "Weight",
      value: this.weight.value,
    },
    {
      vitalsignid: 3,
      name: "Height",
      value: this.height.value,
    },
    {
      vitalsignid: 4,
      name: "Blood Pressure Sys",
      value: this.bloodPressuresys.value,
    },
    {
      vitalsignid: 5,
      name: "Respiration Rate",
      value: this.respirationRate.value,
    },
    {
      vitalsignid: 6,
      name: "Blood Pressure dia",
      value: this.bloodPressuredia.value,
    }]

    this.patientVitalSigns = {
      appointmentid: Number(this.appointmentId),
      patientvisitdetailid: 0,
      vitalsigns: JSON.stringify(this.patientVitalSignDetails),
      appointment: {
        Description: this.vitalDescription.value
      },
      createdby: "",
      createddate: new Date(Date.now()),
      modifiedby: "",
      modifieddate: new Date(Date.now()),
    }
    this.auth.saveVitalSignDetails(this.patientVitalSigns).subscribe(response => {
      saveBtn.disabled = true
      this.util.showSuccess("Vital sign details have been saved successfully")
    },
      error => {
        this.util.showDanger("Something bad happened error status: " + error.status)
      })

  }


  ngOnInit(): void {
    this.show = true
    this.showAvaialbleData()
  }

  showAvaialbleData() {
    this.auth.getVitalSignDetailsById(this.appointmentId).subscribe(response => {
      if (response == null) {
      } else{
        this.storeDataInFelds(response);
      }
      
    })
  }

  storeDataInFelds(response: any) {
    const vitalSignDataObject = JSON.parse(response.vitalsigns)
    this.bodyTemperature.setValue(vitalSignDataObject[0].value)
    this.weight.setValue(vitalSignDataObject[1].value)
    this.height.setValue(vitalSignDataObject[2].value)
    this.bloodPressuresys.setValue(vitalSignDataObject[3].value)
    this.respirationRate.setValue(vitalSignDataObject[4].value)
    this.bloodPressuredia.setValue(vitalSignDataObject[5].value)
    this.vitalDescription.setValue(response.appointment.description)
  }

  showPopover(event: Event, errParentNode: HTMLElement) {
    this.util.showPopoverCopy(event, errParentNode)
  }


  show = true
  popupSaveDetails(){
    if(this.show== true && this.saveButton.nativeElement.disabled == false)
      this.modal.open(this.popup,{ size: 'sm' })
    
    this.show = false
  }

  hidePopup(){
    this.modal.dismissAll()
  }

}
