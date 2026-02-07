import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { environment } from 'src/environments/environment';
import { ChangePasswordRequest } from '../../models/change-password-model';
import { RoleModel, UserModel } from '../../models/user-model';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  uniqueKey:string
  showOldPass:boolean = true
  showChangePassCard:boolean = true
  showkeyTimeOutCard: boolean = false
  showUsername: boolean = true;
  showLink: boolean = false;
  goToUrl: string;

  user: UserModel;
  username: string;
  userId: number;
  errorMessage: string;
  message:string;
  roleId:number;
  attempts:number=0;
  hideSubmit:boolean=false;
  roles: RoleModel[] = [];
  oldPassword = new FormControl('', [
    Validators.required]);
  newPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$^!%*?&])"))
  ]);
  confirmNewPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$^!%*?&])")),
    ChangePasswordComponent.comparePasswords
  ]);

  changePwdForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router,
    private auth: AuthService, private util: UtilService,private activatedroute:ActivatedRoute) {
    this.changePwdForm = this.fb.group({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    });
    
    if(this.activatedroute.snapshot.queryParamMap.has('key')){
      this.uniqueKey = this.activatedroute.snapshot.queryParamMap.get('key');
    
      this.auth.checkuniqueKeyTimeOut(this.uniqueKey).subscribe((response:any) =>{
        if(response == false){
          this.message = "The Current Link Has Expired, Please generate New Link And Try Again."
          this.showkeyTimeOutCard = true
          this.showUsername = false;
          this.showChangePassCard = false
        }
        else{
          this.oldPassword.setValue(this.uniqueKey)
          this.showOldPass = false
          this.showkeyTimeOutCard = false
          this.showUsername = false;
          this.showChangePassCard = true
        }
    })
    }
  }

  ngOnInit(): void {
    this.util.initializePopover();
    this.getAllRoles();
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.username = user.fullName;
    this.userId = user.userid;
    //this.roleId = user.roleid;
    if (user.isFirstLogin) {
      this.showLink = false;
    }
    else {
      this.showLink = true;
      if (user.role == "Patient") {
        this.goToUrl = "/patient/dashboard/home";
      }
      else if(user.role == "Nurse") {
        this.goToUrl = "/nurse/dashboard/home";
      }
      else if(user.role == "Physician") {
        this.goToUrl = "/physician/dashboard/home";
      }
      else {
        this.goToUrl = "/admin/dashboard/home";
      }
    }
    this.getAttemptsFromSession();
    if (this.attempts >= 3) {
      this.hideSubmit = true;
      this.showLink = false;
    }
    else {
      this.hideSubmit = false;
    }
  }
  getAttemptsFromSession() {
    var cpAttempts = sessionStorage.getItem("cpAttempts");
    this.attempts = cpAttempts != null ? parseInt(cpAttempts) : 0;
  }
  onChangePassword() {
    const { oldPassword: cOldPassword, newPassword: cNewPassword } = this.changePwdForm.value;
    console.log("attempts 1", this.attempts);
    this.getAttemptsFromSession();
    console.log("attempts 2", this.attempts);
    this.attempts = this.attempts + 1;
    console.log("attempts 3", this.attempts);
    sessionStorage.removeItem("cpAttempts");
    sessionStorage.setItem("cpAttempts", this.attempts.toString());
    let request:ChangePasswordRequest 
    if(this.showOldPass == false){
      request = {
        userId: this.userId,
        oldPassword:this.uniqueKey,
        newPassword: sha256(cNewPassword),
        attempt: this.attempts
      };
    }
    else{
      request = {
        userId: this.userId,
        oldPassword:sha256(cOldPassword),
        newPassword: sha256(cNewPassword),
        attempt: this.attempts
      };
    }
    if (this.attempts <= environment.loginAttemptsAllowed) {
      this.auth.changePassword(request).subscribe((response: any) => {
        console.log(response)
        if (response == true) {
          this.util.showSuccess("Password Changed Succefully..")
          this.hideSubmit = true;
          this.util.showOrRemoveLoader(false);
          setTimeout(() => {
            this.auth.logout()
            window.open('/user/login', '_self');
          }, 3000);
        }
      }, error => {
        if (error.status == 304) {
          this.errorMessage = "You can't use an already used passwords.";
          this.hideSubmit = false;
        }
        else if (error.status == 400) {
          this.errorMessage = "Operation failed.";
          this.hideSubmit = false;
        }
        else if (error.status == 423) {
          this.errorMessage = "Your account has been locked for next 24 hours for security purpose. Please contact the hospital administrator or call helpdesk on 123456 for more information.";
          this.hideSubmit = true;
        }

        this.util.showDanger(this.errorMessage)
      });
    }
    else {
      this.errorMessage = "Contact admin to unlock your account.";
      this.util.showDanger(this.errorMessage);
    }
  }
  verifyOldPassword(event: any) {
    const request:ChangePasswordRequest={
      userId: this.userId,
      oldPassword: sha256(event.target.value),
    };
    this.auth.verifyPassword(request).subscribe(isVerified=>{
      if (isVerified) {
        this.errorMessage = "";
      }
      else {
        this.errorMessage = "Kindly provide correct old password";
        this.util.showDanger(this.errorMessage);
        document.getElementById("oldPassword").focus();
      }
    }, error => {
      this.errorMessage="Something happened. Try again later!!";
    });
  }
  static comparePasswords(control: AbstractControl) {
    let pwd: string = "";
    if (control.root.get("newPassword")) {
      pwd = control.root.get("newPassword").value;
    }
    const isSame = control.value === pwd ? true : false;
    return isSame ? null : { ComparePasswords: true }
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
    if (InputField.name == "oldPassword") {
      this.verifyOldPassword(event);
    }
  }
  getAllRoles() {

    this.auth.getRoles().subscribe(res => {
      this.roles = res;
    });
  }
  showPopover(event: Event, errParentNode: HTMLElement) {
    this.util.showPopoverCopy(event, errParentNode);
  }
}
