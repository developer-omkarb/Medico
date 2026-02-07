import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicineModel } from '../../../admin/models/medicine-model';
import { AuthService } from '../../../auth.service';
import { UtilService } from '../../../shared/service/utility.service';
import { Login } from '../../../user/models/login-model';
import { loginResponseModel } from '../../../user/models/login-response-model';
import { UserModel } from '../../../user/models/user-model';
import { PatientMedicineDetails, PatientPrescriptionModel } from '../../models/patient-prescription-model';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css']
})
export class AddMedicationComponent implements OnInit, AfterViewInit {
  @ViewChild("resetButton", { static: false }) resetButton: ElementRef;
  @ViewChild("saveButton", { static: false }) saveButton: ElementRef;
  @ViewChild("popup", { static: false }) popup: ElementRef;

  @Input() appointmentId: number;
  medicinesMaster: MedicineModel[];
  medicinesid: MedicineModel[];
  medicines: MedicineModel[];
  medicinesTemp: MedicineModel[];
  medicinesIdTemp: MedicineModel[];
  medicinesForm: MedicineModel[];
  medicinesFormTemp: MedicineModel[];
  username: string;
  showButtons: boolean = true;

  form: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder, private util: UtilService,private modal:NgbModal) {
  }

  
  ngAfterViewInit(): void {

    const myForm = this.fb.group({
      username: ['JohnDoe'],
      password: ['secret'],
    });

    const formGroup = new FormGroup({
      FirstName : new FormControl("",[Validators.max(5),Validators.required]),
      LastName : new FormControl("",[Validators.max(5),Validators.required]),
    },
    [Validators.email])
    setTimeout(() => {
      if (this.userSessionData.role == "Nurse")
        this.btnToggleRoleBased = false
      else
        this.addMedication()
    }, 3000);

  }

  addMedication() {
    this.setForm.push(this.fb.group({
      medicinid: new FormControl('', [Validators.required]),
      drugname: new FormControl('', [Validators.required]),
      drugform: new FormControl('', [Validators.required]),
      dosagedetails: new FormControl('', [Validators.required]),
      prescriptionnote: new FormControl('')
    }));
    this.fillMedicinesDataList(this.medicinesMaster);
  }
  userSessionData
  btnToggleRoleBased = true

  fillMedicinesDataList(meds: MedicineModel[]) {
    this.medicines = meds.filter((med, i, arr) => arr.findIndex(t => t.drugname === med.drugname && med.isDeprecated == false) === i);
    this.medicinesTemp = this.medicines;
    this.medicinesid = meds.filter(x => x.isDeprecated == false);
    this.medicinesIdTemp = this.medicinesid;
    this.medicinesForm = meds.filter((med, i, arr) => arr.findIndex(t => t.form === med.form && med.isDeprecated == false) === i);
    this.medicinesFormTemp = this.medicinesForm;
  }

  ngOnInit(): void {
    this.show = true
    this.userSessionData = JSON.parse(sessionStorage.getItem("user"))
    this.form = this.fb.group({
      medications: new FormArray([])
    });

    this.auth.getAllMedicines().subscribe(res => {
      this.medicinesMaster = res.filter(x => x.isDeprecated == false);
      this.fillMedicinesDataList(this.medicinesMaster);

      const userDetails: any = JSON.parse(sessionStorage.getItem("user"));
      if (userDetails != null) {
        this.username = String(userDetails.userid);
      }

      this.showAvaialbleData()

    });

    setTimeout(() => {
      this.disableFields()
    }, 2000);
  }

  disableFields() {
    if (this.userSessionData.role == "Nurse") {
      this.form.disable()
    }
  }

  get getForm() { return this.form.controls; }
  get setForm() { return this.getForm.medications as FormArray; }
  get medicationFormGroups() { return this.setForm.controls as FormGroup[]; }

  checkDuplicacyofMedicines(medicines: any[]): boolean {
    let noDuplicacy: boolean = true;
    medicines.forEach(med => {
      if (medicines.filter(x => x.medicinid == med.medicinid).length > 1) {
        noDuplicacy = false;
      }
      else {
        noDuplicacy = noDuplicacy ? true : false;
      }
    });
    return noDuplicacy;
  }

  saveMedication(event: Event) {
    const saveBtn = event.target as HTMLButtonElement

    var { medications: IMedication } = this.form.value;
    if (this.checkDuplicacyofMedicines(IMedication)) {

      let medArray: PatientMedicineDetails[] = [];
      IMedication.forEach(med => {
        const medObj: PatientMedicineDetails = {
          appointmentid: this.appointmentId,
          dosagedetails: med.dosagedetails,
          medicinid: this.medicinesMaster.find(x => x.medicinid == med.medicinid && x.form == med.drugform && x.drugname == med.drugname).medicinid,
          prescriptionnote: med.prescriptionnote,
          createdby: this.username
        };
        medArray.push(medObj);
      });
      const prescription: PatientPrescriptionModel = {
        appointmentid: this.appointmentId,
        medicinDetails: medArray,
        createdby: this.username
      };
      this.auth.addPatientPrescription(prescription).subscribe(res => {
        this.util.showSuccess("Medication saved successfully");
        saveBtn.disabled = true
      }, error => {
        this.util.showDanger("Some error occured. Try again.");
        saveBtn.disabled = false
      });
    }
    else {
      this.util.showWarning("You can't select duplicate medicines")
    }
  }
  showNotAvailableMsg = false
  showAvaialbleData() {
    this.auth.getPrescriptionMedicationDetailsById(this.appointmentId).subscribe(response => {
      if (response == null) {
        this.showNotAvailableMsg = (this.userSessionData.role == "Nurse") ? true : false
      } else{
        this.storeDataInFelds(response);
        this.resetButton.nativeElement.disabled = false
      }
      
    })
  }

  storeDataInFelds(response: PatientPrescriptionModel) {
    let i = 0
    response.medicinDetails.forEach(detail => {
      this.addMedication();
      this.setForm.controls[i].setValue({
        dosagedetails: detail.dosagedetails,
        drugform: detail.medicin.form,
        drugname: detail.medicin.drugname,
        medicinid: detail.medicin.medicinid,
        prescriptionnote: detail.prescriptionnote
      })
      i += 1
    });
  }


  showPopover(event: Event, errParentNode: HTMLElement) {
    this.util.showPopoverCopy(event, errParentNode)
  }

  resetForm() {
    this.form.reset();
    this.fillMedicinesDataList(this.medicinesMaster);
    //this.setForm.clear();
  }

  deleteMedicine(index: number) {
    if (this.setForm.length > 1)
      this.setForm.removeAt(index);
    else
      this.util.showWarning("Atleast one medication detail should filled.")
  }

  updateDrugName(index: number, medicArray: FormGroup) {
      var { medications: IMed } = this.form.value;
    let medicineid:number = IMed[index].medicinid;
    if (medicineid != 0) {
      this.medicinesTemp = this.medicinesMaster.filter(t => t.medicinid == medicineid);
      if (this.medicinesTemp == null) {
        medicArray.controls.drugname.setValue("")
        this.util.showWarning("Select valid drug")
      } else {
        if (this.medicinesTemp.length == 1) {
          medicArray.controls.drugname.setValue(this.medicinesTemp[0].drugname);
          medicArray.controls.drugform.setValue(this.medicinesTemp[0].form);
        }
      }
    }
  }
  updateDrugForm(index: number, medicArray: FormGroup) {
      var { medications: IMed } = this.form.value;
    var drugname = IMed[index].drugname;
    if (drugname != "" && drugname != null) {
      if (IMed[index].medicinid != '') {
        this.medicinesFormTemp = this.medicinesMaster.filter(t => t.drugname == drugname && t.medicinid == IMed[index].medicinid);
      }
      else {
        this.medicinesFormTemp = this.medicinesMaster.filter(t => t.drugname == drugname).filter((med, i, arr) => arr.findIndex(t => t.form === t.form) === i);
      }
      if (this.medicinesFormTemp == null) {
        medicArray.controls.drugform.setValue("")
        this.util.showWarning("Select valid form")
      } else {
        if (this.medicinesFormTemp.length == 1) {
          medicArray.controls.drugform.setValue(this.medicinesFormTemp[0].form);
          medicArray.controls.medicinid.setValue(this.medicinesFormTemp[0].medicinid);
        }
      }
    }
  }
  updateDrugId(index: number, medicArray: FormGroup) {
      var { medications: IMed } = this.form.value;
      var drugname = IMed[index].drugname;
    var form = IMed[index].drugform;
    if ((drugname != "" && drugname != null) && (form != "" && form != null)) {
      this.medicinesIdTemp = this.medicinesMaster.filter(t => t.drugname == drugname && t.form == form);
    }
    if (this.medicinesIdTemp == null) {
      medicArray.controls.medicinid.setValue("")
      this.util.showWarning("Select valid id")
    } else {
      if (this.medicinesIdTemp.length == 1) {
        medicArray.controls.medicinid.setValue(this.medicinesFormTemp[0].medicinid);
      }
    }
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
