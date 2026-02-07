import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';
import { Employee, Patient, Person, RoleModel, TitleModel, UserModel } from '../../models/user-model';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showThankYou: boolean;
  successMessage: string;
  titles: TitleModel[] = [];
  roles: RoleModel[] = [];
  response: any;
  telObj:any;
  userRole:string="";
  today:Date=new Date();
  AutoEmpId: string;
  defaultPassword: string = "Employee@123";
  isPhysician: boolean = false;
  selectedItems = [];
  dropdownSettings = {};
  dropdownList = [];
  specialitiesArray: any;
  selectedSpecialities = [];
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

  role = new FormControl('', []);

  employeeID = new FormControl('', []);
  workExp = new FormControl('', [
    Validators.required
  ]);
  workLocation = new FormControl('', [
    Validators.required
  ]);
  specialities = new FormControl([], [
    Validators.required
  ]);

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
      role:this.role,
      employeeID:this.employeeID
    });
  }

  ngOnInit(): void {
    this.getAllTitles();
    this.getAllRoles();
    var userDetails = JSON.parse(sessionStorage.getItem("user"));
    this.userRole = userDetails != null ? userDetails.role : "";
    this.util.initializePopover();
    if (this.userRole != "") {
      this.getIds();
      this.getSpecialities();
    }
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Specialitires",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,


    };
    

    if(this.userRole!="Admin")
    {
      this.password.setValidators([Validators.required,Validators.pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$^!%*?&])"))]);
      this.confirmPassword.setValidators([Validators.required,RegisterComponent.comparePasswords])
    }
    else{
      this.role.setValidators([Validators.required]);
    }
  }
  getIds() {
    this.auth.getNewEmployeeCode().subscribe(res=>{
      this.response=res;
      if (this.response.status == "Success") {
        this.AutoEmpId=this.response.message;
      this.registerForm.patchValue({ employeeID: this.AutoEmpId });
      }
      else {
        this.successMessage = this.response.message;
      }
    },error=>{
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
    userInfo.roleId = this.roles.find(x => x.name ==(this.userRole=="Admin"?role:"Patient")).roleid;
    userInfo.password =this.userRole=="Admin"?sha256(this.defaultPassword): sha256(password);
    userInfo.TitleId = this.titles.find(x => x.value == title).titleid;

    userInfo.lastChangedPasswordOn = null;
    userInfo.isLocked = false;
    userInfo.createdBy = email;
    userInfo.createdDate = new Date();
    userInfo.person = person;
    if(this.userRole!="Admin")
    {
      var patient = new Patient();
      patient.personId = person.personid;
      patient.userId = userInfo.userId;
      userInfo.patient.push(patient);
    }
    else
    {
      var employee = new Employee();
      employee.code = employeeID;
      employee.createdBy = email;
      employee.createdDate = new Date();
      userInfo.employee = employee;
      employee.worklocation = workLocation;
      employee.experience = workExp;
      employee.Spacilities = this.selectedSpecialities;
      userInfo.employee = employee;
      userInfo.patient=null;
    }
    this.auth.register(userInfo).subscribe(data => {
      this.response = data;
      if (this.response.status == "Success") {
        this.route.navigate(['/user/register-success']);
      }
      else {
        this.showThankYou = false;
        this.successMessage = this.response.message;
      }
    });
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
    });
  }

  getAllRoles() {
    this.auth.getRoles().subscribe(res => {
      this.roles = res;
    });
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
  setfields(event) {

    if (event.target.value == "Physician") {
      this.isPhysician = true;
    }
    else {
      this.isPhysician = false;
    }
  }

  onItemSelect(item: any) {
    var Id = item.id;

    this.selectedSpecialities.push(Id);

    console.log(this.selectedSpecialities, "items");
  }

  OnItemDeSelect(item: any) {

    var data = this.selectedSpecialities.indexOf(item.id);

    this.selectedSpecialities.splice(data, 1);

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
      this.specialitiesArray.forEach(item => {
        this.dropdownList.push({
          id: item.specialityid,
          itemName: item.name
        })
      })

    });
  }
}
