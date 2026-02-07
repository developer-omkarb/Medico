import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { DiagnosisModel } from '../../../admin/models/diagnosis-model';
import { diagnosisDetails } from '../../models/diagnosis-details-model';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  @ViewChild("saveButton", { static: false }) saveButton: ElementRef;
  @ViewChild("resetButton", { static: false }) resetButton: ElementRef;
  @ViewChild("popup", { static: true }) popup: ElementRef;
  popShow = true
  @Input() appointmentId: any
  diagnosisArray = ["A1814", "F0150", "C9151"];
  descriptionArray = ["Adult T-cell lymphoma/leukemia (HTLV-1-assoc), in relapse", "Adult T-cell lymphoma/leukemia (HTLV-1-assoc), in remission", "Tuberculosis of prostate"]

  diagnosisDetails: diagnosisDetails[] = []

  productForm: FormGroup;
  diagnosisForm: FormGroup

  constructor(private fb: FormBuilder, private util: UtilService, private auth: AuthService,private modal : NgbModal) {
    this.diagnosisForm = this.fb.group({
      diagnosisControlsArray: this.fb.array([]),
    });

    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
    });
  }

  diagnosisMaster: DiagnosisModel[] = []
  diagnosisCodes: DiagnosisModel[] = []
  diagnosisDescription: DiagnosisModel[] = []
  btnToggleRoleBased = true
  userSessionData

  ngOnInit(): void {
    this.show = true
    this.userSessionData = JSON.parse(sessionStorage.getItem("user"))
    if (this.userSessionData.role == "Nurse")
      this.btnToggleRoleBased = false
    else
      this.addDiagnosisControls()

    this.auth.getAllDiagnosis().subscribe(response => {
      let i = 0
      this.diagnosisMaster = response.filter(x => x.isDeprecated == false)
    })
    setTimeout(() => {
      this.showAvaialbleData()
    }, 3000);

    setTimeout(() => {
      this.disableFields()
    }, 2000);
  }

  disableFields() {
    if (this.userSessionData.role == "Nurse") {
      this.diagnosisForm.disable()
    }
  }

  setDiagnosisDescription(diagnosisControl: FormGroup) {
    const diagnosisCode = diagnosisControl.controls.diagnosis.value
    const diagnosisObj = this.diagnosisMaster.find(x => x.code == diagnosisCode)
    if (diagnosisObj == undefined) {
      diagnosisControl.controls.description.setValue("")
      this.util.showWarning("Select Valid Diagnosis")
    } else {
      const diagDescription = diagnosisObj.description
      diagnosisControl.controls.description.setValue(diagDescription)
    }
  }

  setDiagnosisId(diagnosisControl: FormGroup) {
    const diagDescription = diagnosisControl.controls.description.value
    const diagnosisObj = this.diagnosisMaster.find(x => x.description == diagDescription)
    if (diagnosisObj == undefined) {
      diagnosisControl.controls.diagnosis.setValue("")
      this.util.showWarning("Select Valid Description")
    } else {
      const diagnosisId = diagnosisObj.code
      diagnosisControl.controls.diagnosis.setValue(diagnosisId)
    }
  }

  addDiagnosisControls() {
    this.diagnosisControlsArray().push(this.newDiagnosis());
  }

  diagnosisControlsArray(): FormArray {
    return this.diagnosisForm.get("diagnosisControlsArray") as FormArray
  }

  newDiagnosis(): FormGroup {
    return this.fb.group({
      diagnosis: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      deprecated: new FormControl('', Validators.required),
    })
  }

  checkRepeatingDiagnoses() {
    if (this.diagnosisControlsArray().length == 1) return true
    let flag = 0
    for (let iindex = 0; iindex < this.diagnosisControlsArray().length - 1; iindex++) {
      for (let jindex = iindex + 1; jindex < this.diagnosisControlsArray().length; jindex++) {
        if (this.diagnosisControlsArray().controls[iindex].value.diagnosis == this.diagnosisControlsArray().controls[jindex].value.diagnosis) {
          this.util.showWarning("Do not repeat the procedures")
          this.diagnosisControlsArray().controls[jindex].setValue({
            diagnosis: "",
            description: "",
            deprecated: ""
          })
          return false
        } else
          flag = 1
      }
    }
    return (flag == 1) ? true : false
  }

  saveDiagnosisDetails(event: Event) {
    const saveBtn = event.target as HTMLButtonElement
    console.log("INSIDE SUBMIT DIAGNOSIS")
    if (this.checkRepeatingDiagnoses()) {
      console.log("INSIDE SUBMIT DIAGNOSIS")
      this.diagnosisControlsArray().controls.forEach(diagnos => {
        const selecteddiagnosisobj = this.diagnosisMaster.find(x => x.code == diagnos.value.diagnosis)
        this.diagnosisDetails.push({
          diagnosisid: selecteddiagnosisobj.diagnosisid,
          diagnosisnote: diagnos.value.description,
          appointmentid: Number(this.appointmentId),
          createdby: "",
          createddate: new Date(Date.now()),
          modifiedby: "",
          modifieddate: new Date(Date.now()),
        })
      });
      this.auth.saveDiagnosisDetails(this.diagnosisDetails).subscribe(response => {
        console.log("Response from BE: ", response)
        saveBtn.disabled = true
        this.util.showSuccess("Diagnosis Details has been saved succefully")
      },
        error => {
          console.log("ERROR from BE", error.status)
          this.util.showDanger("Something bad happened error status: " + error.status)
        })

      console.log("Diagnosis details array: ", this.diagnosisDetails)
    }
  }
  showNotAvailableMsg = false
  showAvaialbleData() {
    this.auth.getDiagnosisDetailsById(this.appointmentId).subscribe(response => {
      if (response.length == 0) {
          this.showNotAvailableMsg = (this.userSessionData.role == "Nurse")? true:false
      } else{
        this.storeDataInFelds(response);
        if (this.userSessionData.role != "Nurse") {
          this.resetButton.nativeElement.disabled = false;
        }
      }
    })
  }

  storeDataInFelds(response) {
    let i = 0
    response.forEach(detail => {
      this.addDiagnosisControls()
      this.diagnosisControlsArray().controls[i].setValue({
        diagnosis: this.diagnosisMaster.find(x => x.diagnosisid == detail.diagnosisid).code,
        description: detail.diagnosisnote,
        deprecated: false
      })
      i += 1
    });
  }

  removeDiagnosisDetail(i: number) {
    if (this.diagnosisControlsArray().length > 1)
      this.diagnosisControlsArray().removeAt(i);
    else
      this.util.showWarning("Atleast one diagnosis detail should be filled.")
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
