import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { Employee, Patient, Person, RoleModel, TitleModel, UserModel } from '../../../user/models/user-model';
import { ResponseModel } from 'src/app/user/models/response-model';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output()

  onCloseEvent = new EventEmitter<any>();


  @Input()
  selectedUser: any;

  isAddMode: boolean;

  showThankYou: boolean;
  successMessage: string;
  titles: TitleModel[] = [];
  roles: RoleModel[] = [];
  response: any;
  telObj: any;
  userRole: string;
  today: Date = new Date();
  AutoEmpId: string;
  isPhysician: boolean = false;
  selectedItems = [];
  dropdownSettings = {};
  dropdownList = [];
  dropdowntemp = [];
  specialitiesArray: any;
  selectedSpecialities = [];
  defaultPassword: string = "Employee@123";
  @ViewChild(AngularMultiSelect, { static: false }) dDown: AngularMultiSelect;
  title = new FormControl('', [
    Validators.required,

  ]);


  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  gender = new FormControl('', [
    Validators.required
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  dob = new FormControl('', [
    Validators.required
  ]);

  contactNo = new FormControl('', [
    Validators.required,
    Validators.pattern("[1-9][0-9]{9}$"),
    Validators.minLength(10)
  ]);

  dialcode = new FormControl('91', [
    Validators.required
  ]);

  password = new FormControl('', [
  ]);

  confirmPassword = new FormControl('', [
  ]);
  workExp = new FormControl('', [
    Validators.required
  ]);
  workLocation = new FormControl('', [
    Validators.required
  ]);
  specialities = new FormControl([], [
    Validators.required
  ]);


  role = new FormControl('', []);

  employeeID = new FormControl('', []);

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router,
    private auth: AuthService, private util: UtilService) {
    this.registerForm = this.fb.group({
      title: this.title,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      email: this.email,
      dob: this.dob,
      contactNo: this.contactNo,
      dialcode: this.dialcode,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: this.role,
      employeeID: this.employeeID,
      workExp: this.workExp,
      workLocation: this.workLocation,
      specialities: this.specialities
    });
  }

  ngOnInit(): void {
    this.dropdownList = [
      { "id": 1, "itemName": "Allergist" },
      { "id": 2, "itemName": "Anaesthesiologist" },
      { "id": 3, "itemName": "Andrologist" },
      { "id": 4, "itemName": "Cardiologist" },
      { "id": 5, "itemName": "Dermatologist" },
      { "id": 6, "itemName": "Dietitian" },
      { "id": 7, "itemName": "Endocrinologist" },
      { "id": 8, "itemName": "Epidemiologist" },
      { "id": 9, "itemName": "Gastroenterologist" },
      { "id": 10, "itemName": "Geriatrician" },
      { "id": 11, "itemName": "Hematologist" },
      { "id": 12, "itemName": "Hepatologist" },
      { "id": 13, "itemName": "Immunologist" },
      { "id": 14, "itemName": "Neonatologist" },
      { "id": 15, "itemName": "Neurologist" },
      { "id": 16, "itemName": "Gynecologist" },
      { "id": 17, "itemName": "Oncologist" },
      { "id": 18, "itemName": "Orthopedist" },
      { "id": 19, "itemName": "Pathologist" },
      { "id": 20, "itemName": "Periodontist" },
      { "id": 21, "itemName": "Pediatrician" },
      { "id": 22, "itemName": "Plastic Surgeon" },
      { "id": 23, "itemName": "Psychiatrist" },
      { "id": 24, "itemName": "Pulmonologist" },
      { "id": 25, "itemName": "Rheumatologist" },
      { "id": 26, "itemName": "Surgeon" },
      { "id": 27, "itemName": "Urologist" },
      { "id": 28, "itemName": "Veterinarian" },
      { "id": 29, "itemName": "Chiropractor" },
      { "id": 30, "itemName": "Nutritionist" }
    ];
    this.getSpecialities();
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.userRole = user.role;
    if (this.selectedUser != null) {
      this.isAddMode = false;

      if (this.selectedUser.roleid == 2) {
        this.isPhysician = true;
      }
      else {
        this.isPhysician = false;

        this.registerForm.get('workExp').clearValidators();
        this.registerForm.get('workExp').updateValueAndValidity();

        this.registerForm.get('specialities').clearValidators();
        this.registerForm.get('specialities').updateValueAndValidity();

        this.registerForm.get('workLocation').clearValidators();
        this.registerForm.get('workLocation').updateValueAndValidity();

      }
    }
    else {

      this.isAddMode = true;
      if (this.userRole != "Admin") {
        this.registerForm.get('workExp').clearValidators();
        this.registerForm.get('workExp').updateValueAndValidity();

        this.registerForm.get('specialities').clearValidators();
        this.registerForm.get('specialities').updateValueAndValidity();

        this.registerForm.get('workLocation').clearValidators();
        this.registerForm.get('workLocation').updateValueAndValidity();
      }
    }
  
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Specialities",
      enableSearchFilter: true,
      position: top,
    };

    console.log(this.selectedUser, "selectedUser");
    this.getAllTitles();
    this.getAllRoles();
    this.util.initializePopover();
    this.getIds();
    var userDetails = JSON.parse(sessionStorage.getItem("user"));
    // this.userRole=userDetails!=null?userDetails.role:"";

    if (this.userRole != "Admin") {
      this.password.setValidators([Validators.required, Validators.pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$^!%*?&])"))]);
      this.confirmPassword.setValidators([Validators.required, AddUserComponent.comparePasswords])
    }
    else {
      this.role.setValidators([Validators.required]);
    }
    setTimeout(() => {
      if (!this.isAddMode) {
        this.updateForm();
      }
    }, 2000);

  }

  updateForm() {
    var titlevalue = this.titles.find(x => x.titleid == this.selectedUser.person.titleid).value;
    var rolename = this.roles.find(x => x.roleid == this.selectedUser.roleid).name;
    this.registerForm.patchValue({ title: titlevalue });
    this.registerForm.patchValue({ firstName: this.selectedUser.person.firstname });
    this.registerForm.patchValue({ lastName: this.selectedUser.person.lastname });
    this.registerForm.patchValue({ gender: this.selectedUser.person.gender });
    this.registerForm.patchValue({ email: this.selectedUser.person.email });
    this.registerForm.patchValue({ dob: this.selectedUser.person.dob });
    this.registerForm.patchValue({ contactNo: this.selectedUser.person.contactnumber });
    this.registerForm.patchValue({ employeeID: this.selectedUser.employee.code });
    this.registerForm.patchValue({ role: rolename });
    this.registerForm.patchValue({ workLocation: this.selectedUser.employee.worklocation });
    this.registerForm.patchValue({ workExp: this.selectedUser.employee.experience });
    this.specialitiesArray.forEach(item => {
      this.selectedUser.employee.spacilities.forEach(item1 => {
        if (item.specialityid == item1) {
          this.selectedItems.push({
            id: item.specialityid,
            itemName: item.name
          });
        }
      })
    })
    this.registerForm.patchValue({ specialities: this.selectedItems });
    this.registerForm.updateValueAndValidity();
  }
  getIds() {
    this.auth.getNewEmployeeCode().subscribe(res => {
      this.response = res;
      if (this.response.status == "Success") {
        this.AutoEmpId = this.response.message;
        this.registerForm.patchValue({ employeeID: this.AutoEmpId });
      }
      else {
        this.successMessage = this.response.message;
      }
    }, error => {
      console.log(error);
    });
  }
  showPopover(target: HTMLElement) {
    this.util.showPopover(target);
  }
  static comparePasswords(control: AbstractControl) {
    let pwd: string = "";
    if (control.root.get("password")) {
      pwd = control.root.get("password").value;
    }
    const isSame = control.value === pwd ? true : false;
    return isSame ? null : { ComparePasswords: true }
  }

  onRegister(event: Event) {
    console.log(this.registerForm.get('specialities').value);
    event.preventDefault();
    const { email, password, firstName, lastName, gender, dob, contactNo, dialcode: dialCode, title, employeeID, role, workExp, workLocation, specialities } = this.registerForm.value;
    var person = new Person();
    person.titleid = this.titles.find(x => x.value == title).titleid;
    person.firstname = firstName;
    person.lastname = lastName;
    person.dob = dob;
    person.contactnumber = contactNo;
    person.gender = gender;
    person.email = email;
    person.dialcode = this.telObj.s.dialCode;

    var userInfo = new UserModel();
    userInfo.email = email;
    userInfo.roleId = this.roles.find(x => x.name == (this.userRole == "Admin" ? role : "Patient")).roleid;
    userInfo.password = this.userRole == "Admin" ? sha256(this.defaultPassword) : sha256(password);
    userInfo.TitleId = this.titles.find(x => x.value == title).titleid;

    userInfo.lastChangedPasswordOn = null;
    userInfo.isLocked = false;
    userInfo.createdBy = email;
    userInfo.createdDate = new Date();
    userInfo.person = person;
    if (this.userRole != "Admin") {
      var patient = new Patient();
      patient.personId = person.personid;
      patient.userId = userInfo.userId;
      userInfo.patient.push(patient);
    }
    else {
      var employee = new Employee();
      employee.code = employeeID;
      employee.createdBy = email;
      employee.createdDate = new Date();
      employee.worklocation = workLocation;
      employee.experience = workExp;
      employee.Spacilities = this.selectedSpecialities;
      // userInfo.employee.push(employee);
      userInfo.employee = employee;


    }

    if (this.selectedUser != null) {
      console.log(this.selectedUser.userid, "UserId");
      userInfo.userId = this.selectedUser.userid;
      this.auth.updateUser(userInfo).subscribe(data => {
        this.response = data;
        let res: ResponseModel;
        if (this.response != null) {
          res = {
            isError: false,
            Message: "User updated successfully"
          };
        }
        else {
          res = {
            isError: true,
            Message: "Operation failed. Try again"
          };
        }
        this.onCloseEvent.emit(res);
      }, error => {
        let response: ResponseModel = {
          isError: true,
          Message: error.message
        };
        this.onCloseEvent.emit(response);
      });
    }
   else {
      this.auth.register(userInfo).subscribe(data => {
        this.response = data;

        if (this.response != null) {
          let objRes: ResponseModel;
          if (this.response.status.toLowerCase() == 'success') {
            objRes = {
              isError: false,
              Message: "User added succesfully"
            };
          }
          else {
            objRes = {
              isError: true,
              Message: "Operation failed. Try again"
            };
          }
          this.onCloseEvent.emit(objRes);
        }
      }, error => {
        let response: ResponseModel = {
          isError: true,
          Message: error.message
        };
        this.onCloseEvent.emit(response);
      });
    }
   }

  onReset() {
    this.registerForm.reset();
  }

  onCountryChange(event: any) {
    this.telObj.s=event;
  }

  getNumber(event :any)
  {
    //console.log(event.target.value);
  }
  getAllTitles() {

    this.auth.getTitle().subscribe(res => {
      this.titles = res;
      console.log("titles", this.titles)
    });
  }

  getAllRoles() {
    if (this.userRole == "Admin") {
      this.auth.getRoles().subscribe(res => {
        this.roles = res.filter(x => x.name != "Admin" && x.name != "Patient");
      });
    }
    else {
      this.auth.getRoles().subscribe(res => {
        this.roles = res;
      });
    }
   
  }
  telInputObject(obj) {
    this.telObj=obj;
    obj.setCountry('in');
  }
  isUserNameExists()
  {
    if(this.email.hasError("required")==false && this.email.hasError("email")==false)
    {
      this.auth.isUserNameExists(this.email.value).subscribe(exists=>{
        if(exists){
            this.registerForm.controls.email.setErrors({userExists:true});
        }
      });
    }
  }
  closePopUp() {

    this.onCloseEvent.emit(null);
  }
  setfields(event) {

    if (event.target.value == "Physician") {
      this.isPhysician = true;
    }
    else {
      this.isPhysician = false;
      this.registerForm.get('workExp').clearValidators();
      this.registerForm.get('workExp').updateValueAndValidity();

      this.registerForm.get('specialities').clearValidators();
      this.registerForm.get('specialities').updateValueAndValidity();

      this.registerForm.get('workLocation').clearValidators();
      this.registerForm.get('workLocation').updateValueAndValidity();

    }
  }

  onItemSelect(item:any) {
    var Id = item.id;

    this.selectedSpecialities.push(Id);
    //this.dDown.closeDropdown()
    console.log(this.selectedSpecialities, "items");
  }

  OnItemDeSelect(item: any) {

    var data = this.selectedSpecialities.indexOf(item.id);

    this.selectedSpecialities.splice(data,1);
    
  }
  onSelectAll(items: any) {
    items.foreach(x => {
      this.selectedSpecialities.push(x.id)
    });
    
  }
  onDeSelectAll(items: any) {
    items.foreach(x => {
      var data = this.selectedSpecialities.indexOf(x.id);

      this.selectedSpecialities.splice(data, 1);
    })
  }

  getSpecialities() {
    this.auth.getSpacialities().subscribe(res => {
      this.specialitiesArray = res;
      //this.specialitiesArray.forEach(item => {
      //  this.dropdownList.push({
      //    id: item.specialityid,
      //    itemName:item.name
      //  })
      //})

      this.dropdowntemp = this.dropdownList;
      
    });
  }
}
