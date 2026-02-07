import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { TitleModel } from 'src/app/user/models/user-model';
import { AppointmentModel } from '../../models/appointments-model';
import { PatientDetailModel } from '../../models/patient-details-model';
declare var $: any;



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  contactNo: any;
  userSessionData
  today: Date = new Date();
  initialAllergyArray = []
  allergyDetail = []
  allergiesFiltered = []
  allergyDetailType = []
  titles: TitleModel[] = []
  relations = ["Father", "Mother", "Sibling", "Spouse", "Friend", "Other"]
  genders = ["Male", "Female", "Other"]
  
  @Input() appointmentId:any


  title = new FormControl('', [
    Validators.required,
  ]);
  firstNameP = new FormControl('', [
    Validators.required,
  ]);
  lastNameP = new FormControl('', [
    Validators.required,
  ]);
  dob = new FormControl('', [
    Validators.required,
  ]);
  age = new FormControl('', [
    Validators.required,
  ]);
  gender = new FormControl('', [
    Validators.required,
  ]);
  race = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  ethnicity = new FormControl('', [
    Validators.required,
  ]);
  languagesKnown = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ContactNo = new FormControl('', [
    Validators.required,
  ]);
  address = new FormControl('', [
    Validators.required,
  ]);

  //Emergency contact details


  emTitle = new FormControl('', [
    Validators.required,
  ]);

  emFirstName = new FormControl('', [
    Validators.required,
  ]);

  emLastName = new FormControl('', [
    Validators.required,
  ]);

  emRelationship = new FormControl('', [
    Validators.required,
  ]);

  emEmail = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  emContactNo = new FormControl('', [
    Validators.required,
  ]);

  emAddress = new FormControl('', [
    Validators.required,
  ]);

  emAddressCheckBox = new FormControl('', [
  ]);

  allergyCheckBox = new FormControl('', [
  ]);

  allergyFatalCheckBox = new FormControl('', [
  ]);

  emPortalAccess = new FormControl('', [
  ]);

  //allergy Details

  allergyID = new FormControl('', [
  ]);

  allergyType = new FormControl('', [
  ]);

  allergyName = new FormControl('', [
  ]);

  allergyDesc = new FormControl('', [
  ]);

  allergyClinicInfo = new FormControl('', [
  ]);


  PatientDetailsForm: FormGroup;
  appointmentData
  constructor(fb: FormBuilder, private auth: AuthService, private util: UtilService,private router: Router) {

    // this.appointmentData = router.getCurrentNavigation().extras.state.data;

    this.PatientDetailsForm = fb.group({
      title: this.title,
      firstNameP: this.firstNameP,
      lastNameP: this.lastNameP,
      dob: this.dob,
      age: this.age,
      gender: this.gender,
      race: this.race,
      ethnicity: this.ethnicity,
      languagesKnown: this.languagesKnown,
      email: this.email,
      ContactNo: this.ContactNo,
      address: this.address,

      emTitle: this.emTitle,
      emFirstName: this.emFirstName,
      emLastName: this.emLastName,
      emRelationship: this.emRelationship,
      emEmail: this.emEmail,
      emContactNo: this.emContactNo,
      emAddress: this.emAddress,
      emAddressCheckBox: this.emAddressCheckBox,
      emPortalAccess: this.emPortalAccess,
      allergyID: this.allergyID,
      allergyType: this.allergyType,
      allergyName: this.allergyName,
      allergyDesc: this.allergyDesc,
      allergyClinicInfo: this.allergyClinicInfo,
      allergyCheckBox: this.allergyCheckBox,
      allergyFatalCheckBox: this.allergyFatalCheckBox
    })
  }



  telInputObject(obj) {
    this.telObj=obj;
    obj.setCountry('in');
  }
  getNumber(event: any) {
  }
  telObj : any
  onCountryChange(event: any) {
    this.telObj.s=event;
  }

  userid : number
  ngOnInit(): void {
    this.userSessionData = JSON.parse(sessionStorage.getItem("user"))

    this.userid = (this.userSessionData.role == "Patient") ? this.userSessionData.userid : this.getUseridOfPatientbyAppointment()

    

    console.log("APPOINTMENT ID RECEIVED",this.appointmentId)
    this.auth.getTitle().subscribe(response => {
      this.titles = response
    })

    this.getAllAllergiesDetails()

    if (this.allergyDetail != null) {
      setTimeout(() => {
        this.getPatientProfile(Number(this.userid));
      }, 1000);
    }
  }

  getUseridOfPatientbyAppointment(){
    this.auth.getUserByAppointmentId(this.appointmentId).subscribe(response =>{
      this.userid = Number(response)
      console.log("FETCHING USER ID FROM APPOINTMENT")
      return this.userid
    })
  }

  getAllAllergiesDetails() {
    this.auth.getAllergyDetails().subscribe(response => {
      this.allergyDetail = response
      this.initialAllergyArray = response
      this.allergyDetailType = this.allergyDetail
      this.allergiesFiltered = this.allergyDetail
      console.log("ALLERGy array data full", this.allergiesFiltered)
    })
  }

  nullAllergyId = 0

  savePatientProfile(event: Event) {
    event.preventDefault();

    const { title, firstNameP, lastNameP, dob, age, gender, race, ethnicity, languagesKnown, email, ContactNo, address } = this.PatientDetailsForm.value;

    const { emTitle, emFirstName, emLastName, emRelationship, emEmail, emContactNo, emAddress, emPortalAccess } = this.PatientDetailsForm.value

    const { allergyID, allergyDesc } = this.PatientDetailsForm.value

    if (allergyID == null)
      this.nullAllergyId = 0
    else
      this.nullAllergyId = allergyID

    const patientProfileData: PatientDetailModel = {
      patientid: 0,
      personid: 0,
      userid: this.userSessionData.userid,
      allergies: [Number(this.nullAllergyId)],
      emergencycontacts: [],
      allergiesdescription: [allergyDesc],

      person: {
        personid: 0,
        titleid: title,
        firstname: firstNameP,
        lastname: lastNameP,
        dob: dob,
        gender: gender,
        cityid: null,
        race: race,
        ethnicity: ethnicity,
        languageknown: [languagesKnown],
        email: email,
        contactnumber: ContactNo,
        dialcode: this.telObj.s.dialCode,
        address: address,
        age: age,
        city: null,
        title: null,
        patient: null,
        user: null
      },
      user: null,
      appointment: null,
      emergencyContInfo: [{
        firstname: emFirstName,
        lastname: emLastName,
        contactnumber: emContactNo,
        relationship: emRelationship,
        email: emEmail,
        address: emAddress,
        allowedaccess: emPortalAccess,
        dialcode: this.telObj.s.dialCode,
        title: emTitle,
        patientid: 0,
        patient: null
      }]
    };
     
    console.log("PATIENT PROFILE DATA:", patientProfileData)
    this.auth.updatePatientDetails(patientProfileData).subscribe(response => {
      this.util.showSuccess("Your profile has been updated successfully")
    },
      error => {
        this.util.showDanger("Something bad happened while updating your data!!")
      });
  }

  getPatientProfile(userid: number) {    
    this.auth.getPatientDetailById(userid).subscribe(response => {
      if(response == null) this.getUserProfile(userid)
      else {
        this.storeDataInFormFields(response);
        this.util.showSuccess("You can update your data here")
      }
    });
  }

  getUserProfile(userid: number){
    this.auth.getUserById(userid).subscribe(response => {
      console.log("RESPONSE OF USER :",response)
      this.storeDataInFormFields(response)
    },
      error => {
        console.log("ERROR from USER: ",error)
      }
      )
    }

  storeDataInFormFields(response) {
    const patientDetails: PatientDetailModel = response
    let addrChkbox = false

    if (patientDetails.emergencyContInfo.length != 0) {
      if (patientDetails.person.address == patientDetails.emergencyContInfo[0].address)
        addrChkbox = true

      if (patientDetails.allergies != undefined) {
        console.log("ALERGY DATA THAT STOPPING LNEGTHA", patientDetails.allergies.length)
        console.log("ALERGY DATA THAT STOPPING", patientDetails.allergies)
        if (patientDetails.allergies.length != 0) {
          this.allergyCheckBox.setValue(true)
          this.makeAllergyFormValid()
          this.loadDDByAllergyID(Number(patientDetails.allergies[0]))
        }
      }
    }

    this.PatientDetailsForm.setValue({
      title: patientDetails.person.titleid,
      firstNameP: patientDetails.person.firstname,
      lastNameP: patientDetails.person.lastname,
      dob: patientDetails.person.dob,
      age: patientDetails.person.age,
      gender: patientDetails.person.gender,
      race: patientDetails.person.race,
      ethnicity: patientDetails.person.ethnicity,
      languagesKnown: (patientDetails.person.languageknown == undefined) ? null : patientDetails.person.languageknown[0],
      email: patientDetails.person.email,
      ContactNo: patientDetails.person.contactnumber,
      address: patientDetails.person.address,

      emTitle: (patientDetails.emergencyContInfo.length == 0) ? "" : patientDetails.emergencyContInfo[0].title,
      emFirstName: (patientDetails.emergencyContInfo.length == 0) ? "" : patientDetails.emergencyContInfo[0].firstname,
      emLastName: (patientDetails.emergencyContInfo.length == 0) ? "" : patientDetails.emergencyContInfo[0].lastname,
      emRelationship: (patientDetails.emergencyContInfo.length == 0) ? "" : patientDetails.emergencyContInfo[0].relationship,
      emEmail: (patientDetails.emergencyContInfo.length == 0) ? "" : patientDetails.emergencyContInfo[0].email,
      emContactNo: (patientDetails.emergencyContInfo.length == 0) ? "" : patientDetails.emergencyContInfo[0].contactnumber,
      emAddress: (patientDetails.emergencyContInfo.length == 0) ? "" : patientDetails.emergencyContInfo[0].address,
      emPortalAccess: (patientDetails.emergencyContInfo.length == 0) ? false : patientDetails.emergencyContInfo[0].allowedaccess,
      emAddressCheckBox: (patientDetails.emergencyContInfo.length == 0) ? false : addrChkbox,

      allergyID: (patientDetails.allergies == undefined) ? "" : patientDetails.allergies[0],
      allergyDesc: (patientDetails.allergiesdescription == undefined) ? null : patientDetails.allergiesdescription[0],
      allergyType: this.allergyType.value,
      allergyName: this.allergyName.value,
      allergyClinicInfo: this.allergyClinicInfo.value,
      allergyCheckBox: this.allergyCheckBox.value,
      allergyFatalCheckBox: this.allergyFatalCheckBox.value
    });

    this.setAge()
  }


  changeAddress() {
    if (this.emAddressCheckBox.value == true)
      this.emAddress.setValue(this.address.value);
    else
      this.emAddress.setValue("");

    console.log(this.PatientDetailsForm.controls)
  }

  makeAllergyFormValid() {
    if (this.allergyCheckBox.value == false) {
      this.allergyID.clearValidators()
      this.allergyType.clearValidators()
      this.allergyName.clearValidators()
      this.allergyDesc.clearValidators()
      this.allergyClinicInfo.clearValidators()
      this.allergyID.disable()
      this.allergyName.disable()
      this.allergyType.disable()
      this.allergyDesc.disable()
      this.allergyFatalCheckBox.disable()
    }
    else {
      this.allergyID.setValidators(Validators.required)
      this.allergyType.setValidators(Validators.required)
      this.allergyName.setValidators(Validators.required)
      this.allergyDesc.setValidators(Validators.required)
      this.allergyClinicInfo.setValidators(Validators.required)
      this.allergyID.enable()
      this.allergyType.enable()
      this.allergyName.enable()
      this.allergyDesc.enable()
      this.allergyFatalCheckBox.enable()
    }

    this.allergyID.setValue("")
    this.allergyType.setValue("")
    this.allergyName.setValue("")
    this.allergyDesc.setValue(null)
    this.allergyClinicInfo.setValue(null)
    this.allergyID.updateValueAndValidity()
    this.allergyType.updateValueAndValidity()
    this.allergyName.updateValueAndValidity()
    this.allergyDesc.updateValueAndValidity()
    this.allergyClinicInfo.updateValueAndValidity()
    this.resetAllergyArrays()
  }

  setAge() {
    var dob = new Date(this.dob.value)
    let timeDiff = Math.abs(Date.now() - dob.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

    this.age.setValue(age);
  }

  loadDDByAllergyID(event) {
    let allergyID
    if (typeof (event) == "number") {
      allergyID = event;
    } else {
      allergyID = event.target as HTMLSelectElement
      allergyID = Number(allergyID.value)
    }
    let datafromID
    if (allergyID) {
      console.log("Allergy detail array: ", this.allergyDetail)
      datafromID = this.allergyDetail.find(x => x.allergyid == allergyID)
      console.log("Data of allergyID: ", datafromID)
      this.allergyType.setValue(datafromID.type)
      this.allergyName.setValue(datafromID.name)
    } else {
      this.allergyType.setValue("")
      this.allergyName.setValue("")
      this.allergyType.enable()
      this.allergyType.updateValueAndValidity()
    }
    setTimeout(() => {
      this.fillClinicalInfo()
    }, 1000);
  }

  loadDDByAllergyType(event: Event) {
    const allergyTypeDD = event.target as HTMLSelectElement
    this.allergiesFiltered = this.allergyDetail.filter(x => x.type == allergyTypeDD.value)
    this.allergyDetail = this.allergiesFiltered
    this.allergyDetailType = this.allergiesFiltered
  }

  loadDDByAllergyName(event: Event) {
    const allergyNameDD = event.target as HTMLSelectElement
    if (allergyNameDD.value != "") {
      this.allergiesFiltered = this.allergyDetail.filter(x => x.name == allergyNameDD.value && x.type == this.allergyType.value)
      this.allergyDetail = this.allergiesFiltered
    } else {

    }
  }

  fillClinicalInfo() {
    let allergyClinicInfo
    const allergyID = this.allergyID
    const allergyName = this.allergyName
    const allergyType = this.allergyType


    if (allergyID.valid && allergyName.valid && allergyType.valid) {
      console.log("INTIAL ALLERGY ARRAY:", this.initialAllergyArray)
      console.log("ALLERGY ID :", allergyID.value)
      console.log("ALLERGY NAME :", allergyName.value)
      allergyClinicInfo = this.initialAllergyArray.find(x => x.allergyid == allergyID.value && x.name == allergyName.value && x.type == allergyType.value)
      console.log("Clinical info from INITIAL array:", allergyClinicInfo)
      this.allergyClinicInfo.setValue(allergyClinicInfo.allerginicity)
      this.allergyClinicInfo.updateValueAndValidity()
    } else {
      this.allergyClinicInfo.setValue("")
      this.allergyClinicInfo.updateValueAndValidity()

    }
  }

  resetAllergyArrays() {
    this.allergyDetail = this.initialAllergyArray
    this.allergyDetailType = this.initialAllergyArray
    this.allergiesFiltered = this.initialAllergyArray
  }

  showPopover(event: Event, errParentNode: HTMLElement) {
    this.util.showPopoverCopy(event, errParentNode)
  }

}
