import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NurseHomeComponent } from './components/nurse-home/nurse-home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationCheck } from '../shared/service/authorizationCheck';
import { SharedModule } from '../shared/shared.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmpSchedularComponent } from '../employee/component/emp-schedular/emp-schedular.component';
import { AuthGuardGuard } from '../shared/service/auth-guard.guard';
import { AuthErrorComponent } from '../shared/components/auth-error/auth-error.component';

const NURSE_ROUTES: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent, canActivate: [AuthorizationCheck],
    children: [
      {
        path: "home",
        component: NurseHomeComponent
      },
      {
        path: "schedular",
        component: EmpSchedularComponent
      }
      ]
  },
  {
    path: "error",
    component: AuthErrorComponent
  }]

@NgModule({
  declarations: [DashboardComponent, NurseHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeModule,
    RouterModule.forChild(NURSE_ROUTES)
  ]
})
export class NurseModule { }
