import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardcardsbarComponent } from './dashboardcardsbar/dashboardcardsbar.component';
import { TablePatientAppointmentsComponent } from './table-patient-appointments/table-patient-appointments.component';
import { SharedModule } from '../shared/shared.module';
import { EmpSchedularComponent } from './component/emp-schedular/emp-schedular.component';



@NgModule({
  declarations: [ DashboardcardsbarComponent, TablePatientAppointmentsComponent, EmpSchedularComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ DashboardcardsbarComponent, TablePatientAppointmentsComponent,EmpSchedularComponent]
})
export class EmployeeModule { }
