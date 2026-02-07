import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { PhysicianProfileComponent } from './components/physician-profile/physician-profile.component';
import { ViewScheduleModel } from './models/view-schedule.model';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PhysicianHomeComponent } from './components/physician-home/physician-home.component';
import { AuthorizationCheck } from '../shared/service/authorizationCheck';
import { EmployeeModule } from '../employee/employee.module';
import { AuthGuardGuard } from '../shared/service/auth-guard.guard';
import { AuthErrorComponent } from '../shared/components/auth-error/auth-error.component';

const PHYSICIAN_ROUTES: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent, canActivate: [AuthorizationCheck],
    children: [
      {
        path: "home",
        component: PhysicianHomeComponent
      }
      ]
  },
  {
    path: "profile/:id",
    component: PhysicianProfileComponent,
  },
  {
  path:"viewschedule",
  component: ViewScheduleComponent,
  canActivate: [AuthorizationCheck]
  },
  {
    path: "error",
    component: AuthErrorComponent
  }]

@NgModule({
  declarations: [PhysicianProfileComponent,ViewScheduleComponent, DashboardComponent, PhysicianHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeModule,
    RouterModule.forChild(PHYSICIAN_ROUTES),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
      }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
    ]
})
export class PhysicianModule { }
