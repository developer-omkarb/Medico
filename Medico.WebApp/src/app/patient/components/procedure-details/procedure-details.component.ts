import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ProcedureModel } from '../../../admin/models/procedure-model';
import { procedureDetails } from '../../models/procedure-details-model';

@Component({
  selector: 'app-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.css']
})
export class ProcedureDetailsComponent implements OnInit {
  @ViewChild("saveButton", { static: false }) saveButton: ElementRef;
  @ViewChild("resetButton", { static: false }) resetButton: ElementRef;
  @ViewChild("popup", { static: true }) popup: ElementRef;
  @Input() appointmentId: any
  procedureDetails: procedureDetails[] = []

  procedureForm: FormGroup

  constructor(private fb: FormBuilder, private util: UtilService, private auth: AuthService,private modal :NgbModal) {
    this.procedureForm = this.fb.group({
      procedureControlsArray: this.fb.array([]),
    });
  }

  procedureMaster: ProcedureModel[] = []
  userSessionData
  btnToggleRoleBased = true
  ngOnInit(): void {
    this.show = true
    this.userSessionData = JSON.parse(sessionStorage.getItem("user"))
    if (this.userSessionData.role == "Nurse")
      this.btnToggleRoleBased = false
    else
      this.addProcedureControls()

    this.auth.getAllProcedures().subscribe(response => {
      let i = 0
      this.procedureMaster = response.filter(x => x.isDeprecated==false)
    })

    setTimeout(() => {
      this.showAvaialbleData()
    }, 1000);

    setTimeout(() => {
      this.disableFields()
    }, 2000);
  }

  disableFields() {
    if (this.userSessionData.role == "Nurse") {
      this.procedureForm.disable()
    }
  }

  setProcedureDescription(procedureControl: FormGroup) {
    const procedureCode = procedureControl.controls.procedure.value
    const procedureObj = this.procedureMaster.find(x => x.code == procedureCode)
    console.log("FOUND OUT PROCEDURE OBJECT #@!#@!#@!#@!", procedureObj)
    if (procedureObj == undefined) {
      procedureControl.controls.procdescription.setValue("")
      this.util.showWarning("Select Valid Procedure")
    } else {
      const procedureDescription = procedureObj.approach
      procedureControl.controls.procdescription.setValue(procedureDescription)
    }
  }

  setProcedureId(procedureControl: FormGroup) {
    const procedureDescription = procedureControl.controls.procdescription.value
    const procedureObj = this.procedureMaster.find(x => x.approach == procedureDescription)
    if (procedureObj == undefined) {
      procedureControl.controls.procedure.setValue("")
      this.util.showWarning("Select Valid Description")
    } else {
      const procedureCode = procedureObj.code
      procedureControl.controls.procedure.setValue(procedureCode)
    }
  }

  addProcedureControls() {
    this.procedureControlsArray().push(this.newProcedure());
  }

  procedureControlsArray(): FormArray {
    return this.procedureForm.get("procedureControlsArray") as FormArray
  }

  newProcedure(): FormGroup {
    return this.fb.group({
      procedure: new FormControl('', Validators.required),
      procdescription: new FormControl('', Validators.required),
      deprecated: new FormControl('', Validators.required),
    })
  }

  checkRepeatingProcedures() {
    let flag = 0
    if (this.procedureControlsArray().length == 1) return true
    for (let iindex = 0; iindex < this.procedureControlsArray().length - 1; iindex++) {
      for (let jindex = iindex + 1; jindex < this.procedureControlsArray().length; jindex++) {
        if (this.procedureControlsArray().controls[iindex].value.procedure == this.procedureControlsArray().controls[jindex].value.procedure) {
          this.util.showWarning("Do not repeat the procedures")
          this.procedureControlsArray().controls[jindex].setValue({
            procedure: "",
            procdescription: "",
            deprecated: ""
          })
          return false
        } else
          flag = 1
      }
    }
    return (flag == 1) ? true : false
  }


  saveProcedureDetails(event: Event) {
    const saveBtn = event.target as HTMLButtonElement
    if (this.checkRepeatingProcedures()) {
      console.log(this.procedureControlsArray().controls.length)
      this.procedureControlsArray().controls.forEach(proc => {
        const selectedprocedureobj = this.procedureMaster.find(x => x.code == proc.value.procedure)
        this.procedureDetails.push({
          appointmentid: Number(this.appointmentId),
          procedureid: selectedprocedureobj.procedureid,
          procedurenote: proc.value.procdescription,
          createdby: "",
          createddate: new Date(),
          modifiedby: "",
          modifieddate: new Date()
        })
      });
      this.auth.saveProcedureDetails(this.procedureDetails).subscribe(response => {
        console.log("Response from BE: ", response)
        saveBtn.disabled = true
        this.util.showSuccess("Procedure details have been saved successfully")
      },
        error => {
          console.log("ERROR from BE", error.status)
          saveBtn.disabled = false
          this.util.showDanger("Something bad happened error status: " + error.status)
        })

      console.log("Proced details array: ", this.procedureDetails)
    }
  }

  showNotAvailableMsg = false
  showAvaialbleData() {
    this.auth.getProcedureDetailsById(this.appointmentId).subscribe(response => {
      if (response.length == 0) {
        this.showNotAvailableMsg = (this.userSessionData.role == "Nurse") ? true : false
      } else {
        this.storeDataInFelds(response);
        this.resetButton.nativeElement.disabled = false
      }
    })
  }

  storeDataInFelds(response) {
    let i = 0
    response.forEach(detail => {
      this.addProcedureControls()
      this.procedureControlsArray().controls[i].setValue({
        procedure: this.procedureMaster.find(x => x.procedureid == detail.procedureid).code,
        procdescription: this.procedureMaster.find(x => x.procedureid == detail.procedureid).approach,
        deprecated: false
      })
      i += 1
    });
  }



  removeProcedureDetail(i: number) {
    if (this.procedureControlsArray().length > 1)
      this.procedureControlsArray().removeAt(i);
    else
      this.util.showWarning("Atleast one procedure detail should be filled.")
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
