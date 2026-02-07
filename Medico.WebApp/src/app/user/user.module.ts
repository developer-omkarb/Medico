import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const USER_ROUTES: Routes = [
  {
    path: "login",
    component: LoginComponent,
    children:[
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "changePassword",
    component: ChangePasswordComponent
  },
  {
    path: "changePassword?val=uniquekey",
    component: ChangePasswordComponent
  },
  { 
    path: "register-success",
    component: RegisterSuccessComponent
  },
  {
    path: "forgetPassword",
    component: ForgetPasswordComponent
  }
];

@NgModule({
  declarations: [ChangePasswordComponent,ForgetPasswordComponent,LoginComponent,RegisterComponent,RegisterSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(USER_ROUTES),
  ]
})
export class UserModule { }
