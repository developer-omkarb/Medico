import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { Login } from '../../../user/models/login-model';
import { loginResponseModel } from '../../../user/models/login-response-model';
import { LoginHistory, UserModel } from '../../../user/models/user-model';

declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userExists: boolean = false;
  loaderFlag: boolean = false;
  loginAttempts;
  showHideSpinner: boolean = false;
  loginHistoryList: LoginHistory[];
  users: UserModel[];

  errorMessage: string = "";
  ipAddress: string;

  username = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$^!%*?&])")),
    Validators.minLength(8),
    LoginComponent.hasSymbol
  ]);

  static hasSymbol(control: AbstractControl) {
    if (control.dirty && control.value.length >= 1) {
      if (control.value.length >= 8)
        return null
      else
        return { hasSymbol: true }
    } else if (control.value.length == 0)
      return null
  }

  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private route: Router,
    private auth: AuthService, private util: UtilService) {
    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password
    });
  }



  ngOnInit(): void {
    this.userExists = false;
    this.loginAttempts = 0
    if (!sessionStorage.getItem("loginAttempts")) {
      sessionStorage.setItem("loginAttempts", String(this.loginAttempts));
    }



    // this.util.initializePopover();
    //this.auth.getUsers().subscribe((response) => {
    //  this.users = response;
    //});

    //this.auth.getLoginHistory().subscribe(res => {
    //  this.loginHistoryList = res;
    //});
  }
  showPopover(event: Event, errParentNode: HTMLElement) {
    this.util.showPopoverCopy(event, errParentNode);
  }

  //LoginHistory(details: LoginHistory) {
  //  this.auth.loginHistory(details).subscribe();
  //}

  validateUser(username: FormControl) {
    localStorage.setItem('TokenInfo','OMKAR BASWAt')
    alert("Omkar baswat"+username.value)
    sessionStorage.setItem('TokenInfo','OMKAR BASWAt')
    if (username.touched && username.valid) {
      this.util.showOrRemoveLoader(true);
      this.errorMessage = ''
      this.showHideSpinner = true
      const { username: Iusername } = this.loginForm.value;
      console.log(`Username ${Iusername} Original Password`)



      this.auth.isUserNameExists(Iusername).subscribe(isVerified => {
        if (isVerified) {
          this.util.showOrRemoveLoader(false);
          this.errorMessage = ''
          this.userExists = true;
          console.log(`USER IS VERIFIED VALUE: ${isVerified}`);
        }
        else {
          this.userExists = false;
          this.errorMessage = "User does not exist! Register Now!!";
          this.util.showDanger(this.errorMessage)
          this.util.showOrRemoveLoader(false);
        }
      }, error => {
        console.log('error:',error)
        if (error.status == 0) {
          localStorage.setItem('TokenInfo','OMKAR BASWAt')
          this.errorMessage = "Server is not running. Please contact administrator";
        } 
        else if (error.status == 401) {
          this.errorMessage = "Unautherized Access.";
        }else {
          this.errorMessage = "Something bad happened. Please try again later!!";
        }
        this.util.showDanger(this.errorMessage)
        this.util.showOrRemoveLoader(false);
      });
    }
  }


  onUserLoginM() {
    let loginResponseData;
    let userValidFlag: boolean = false;
    this.errorMessage = ''
    this.util.showOrRemoveLoader(true)

    const { username: Iusername, password: Ipassword } = this.loginForm.value;
    console.log(Iusername, sha256(Ipassword))
    const credentials: Login = {
      username: Iusername,
      password: sha256(Ipassword)
    };

    this.auth.loginUser(credentials).subscribe(loginResponseModel => {
      console.log("User Object sent by API: ", loginResponseModel)
      loginResponseData = loginResponseModel;

      if (loginResponseData != null) {
        userValidFlag = true;
      } else {
        userValidFlag = false;
        this.errorMessage = "Something bad happened!!";
        this.util.showOrRemoveLoader(false);
        this.util.showDanger(this.errorMessage)
        return;
      }
      if (userValidFlag) {
        this.storeDataRedirectUser(loginResponseData)
      }
    }, error => {
      if (error.status == 0) {
        this.errorMessage = "Server is not running. Please contact administrator";
      }
      else if (error.status == 404) {
        this.errorMessage = "Invalid Credentials!!!";
      }
      else if (error.status == 423) {
        this.errorMessage = "Login attempts exceeded!!!";
      } 
      else if (error.status == 401) {
        this.errorMessage = "Your account has been blocked!! Please contact administrator.";
      } 
      else if (error.status == 410) {
        this.errorMessage = "Your account has been marked as inactive!! Please contact administrator.";
      } else {
        this.errorMessage = "Something bad happened!!! Please try again later.";
      }
      this.util.showOrRemoveLoader(false);
      this.util.showDanger(this.errorMessage)
    });
  }

  storeDataRedirectUser(loginResponseData) {
    this.errorMessage = "";
    const isFirstLogin = false
    if (loginResponseData != null) {
      const userDetails: loginResponseModel = {
        username: loginResponseData.email,
        fullName: loginResponseData.fullName,
        role: loginResponseData.role,
        token: loginResponseData.token,
        userid: loginResponseData.userid,
        isFirstLogin: loginResponseData.isFirstLogin
      };

      sessionStorage.setItem("user", JSON.stringify(userDetails));
      var dt =  JSON.parse(sessionStorage.getItem("user"));
      localStorage.setItem("TokenInfo",userDetails.token)
      if (userDetails.role.toLowerCase() == "patient") {
        window.open('/patient/dashboard/home', '_self');
      } else {
        if (userDetails.isFirstLogin == true) {
          window.open('/user/changePassword', '_self');
        } else {
          if (userDetails.role.toLowerCase() == "physician") {
            window.open('/physician/dashboard/home', '_self');
          }
          if (userDetails.role.toLowerCase() == "nurse") {
            window.open('/nurse/dashboard/home', '_self');
          }
          if (userDetails.role.toLowerCase() == "admin") {
            window.open('/admin/dashboard/home', '_self');
          }
        }
      }
    }
  }
  sendMail() {
    if (this.username.valid) {
      this.util.showOrRemoveLoader(true)
      var emailsend = this.auth.sendEmailForgotPassword(this.username.value).subscribe((response) => { console.log(response); }, error => {
        if (error.status == 404) {
          this.errorMessage = "Email Not Found. Please Check Your Email Address";
          this.util.showOrRemoveLoader(false)
          this.util.showDanger(this.errorMessage)
        }
        else {
          //TOSTER
          window.open('/user/forgetPassword', '_self');
        }
      });
    } else {
      this.errorMessage = "Please enter valid email.";
      this.util.showDanger(this.errorMessage)

    }
  }
}

