import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialCodeModel, Employee, Person, RoleModel, TitleModel, UserModel } from 'src/app/user/models/user-model';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
declare var $: any;


@Component({
  selector: 'app-hospital-user-register',
  templateUrl: './hospital-user-register.component.html',
  styleUrls: ['./hospital-user-register.component.css']
})
export class HospitalsUserRegisterComponent implements OnInit {
  showThankYou: boolean;
  successMessage: string;
  titles: TitleModel[] = [];
  AutoEmpId: string;
  dialCodes: DialCodeModel[] = [];
  roles: RoleModel[] = [];
  response: any;
  defaultPassword: string = "Employee@123";
  telObj:any;
  today:Date=new Date();
  title = new FormControl('', [
    Validators.required,

  ]);

  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
    //Validators.pattern("[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$")
  ]);

  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
    //Validators.pattern("[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$")
  ]);

  gender = new FormControl('', [
    Validators.required
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  dob = new FormControl('', [
    Validators.required,
    //Validators.pattern("'/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/'")
  ]);

  role = new FormControl('', [
    Validators.required
  ]);


  employeeID = new FormControl('', [
    Validators.required,
  ]);

  dialCode = new FormControl('91', [
    Validators.required
  ]);

  contactNo = new FormControl('', [
    Validators.required,
    Validators.pattern("[1-9][0-9]{9}$"),
    Validators.minLength(10)
  ]);

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private auth: AuthService, 
    public datepipe: DatePipe,private util:UtilService) {
    this.registerForm = this.fb.group({
      title: this.title,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      email: this.email,
      dob: this.dob,
      contactNo: this.contactNo,
      employeeID: this.employeeID,
      dialCode: this.dialCode,
      role: this.role
    });
  }

  ngOnInit(): void {
    this.util.initializePopover();
    this.getAllTitles();
    this.getAllDialCodes();
    this.getAllRoles();
    this.getIds();
   
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
    const { title, firstName, lastName, gender, dob, email, contactNo, employeeID, dialCode, role } = this.registerForm.value;
  

    var person = new Person();
    person.titleid = this.titles.find(x => x.value == title).titleid;
    person.firstname = firstName;
    person.lastname = lastName;
    person.dob = dob;
    person.contactnumber = contactNo;
    person.gender = gender;
    person.email = email;
    //person.dialCodeId = this.dialCodes.find(x => x.dialcode == dialCode).dialcodeid;
    person.dialcode = "";

    // var employee = new Employee();
    // employee.code = employeeID;
    // employee.departmentId = 1;
    // employee.createdBy = email;
    // employee.createdDate = new Date();

 
    var userInfo = new UserModel();
    userInfo.email = email;
    userInfo.roleId = this.roles.find(x => x.name == role).roleid;
    userInfo.password = sha256(this.defaultPassword);
    userInfo.TitleId = this.titles.find(x => x.value == title).titleid;

    userInfo.lastChangedPasswordOn = null;
    userInfo.isLocked = false;
    userInfo.createdBy = email;
    userInfo.createdDate = new Date();
    userInfo.person = person;
    
    var employee = new Employee();
    employee.code = employeeID;
    employee.createdBy = email;
    employee.createdDate = new Date();
   // userInfo.employee = employee;
   // userInfo.patient=null;

   
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
  getNumber(event: any) {
    console.log("getNumber():", event);
    // this.contactNo.setValue(event);
  }
  onCountryChange(event: any) {
    console.log("Country change",event);
    //this.telObj.setCountry()
  }
  triggerCSS(event: Event) {
    const InputField = event.target as HTMLInputElement
    InputField.previousElementSibling.className = "labeltransform"
  }

  removeCSS(event: Event) {
    const InputField: HTMLInputElement = event.target as HTMLInputElement

    if (InputField.value == "")
      InputField.previousElementSibling.className = "form-label"
    else
      InputField.previousElementSibling.className = "labeltransform"
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
  //getIds() {
  //  this.auth.getNewEmployeeCode().subscribe(res=>{
  //    this.response=res;
  //    console.log("Employee code response",this.response);
  //    if (this.response.status == "Success") {
  //      this.AutoEmpId=this.response.message;
  //    this.registerForm.patchValue({ employeeID: this.AutoEmpId });
  //    }
  //    else {
  //      this.successMessage = this.response.message;
  //    }
  //  },error=>{
  //      console.log(error);
  //  });
  //}
  getAllDialCodes() {
    this.auth.getDialCodes().subscribe(res => {
      this.dialCodes = res;
    });
  }
  showPopover(target:HTMLElement) {

    this.util.showPopover(target);

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

  getIds() {
    this.auth.getNewEmployeeCode().subscribe(res => {
      this.response = res;
      console.log("code", this.response);
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
}
