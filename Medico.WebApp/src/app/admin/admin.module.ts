import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalsUserRegisterComponent } from './components/hospital-user-register/hospital-user-register.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



import { UserListComponent } from './components/user-list/user-list.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AuthorizationCheck } from '../shared/service/authorizationCheck';
import { RegisterComponent } from '../user/components/register/register.component';

import { PatientUserListComponent } from './patient-user-list/patient-user-list.component';
import { ViewAllergyComponent } from './components/view-allergy/view-allergy.component';
import { ViewDiagnosisComponent } from './components/view-diagnosis/view-diagnosis.component';
import { ViewProcedureComponent } from './components/view-procedure/view-procedure.component';
import { ViewMedicineComponent } from './components/view-medicine/view-medicine.component';
import { ViewVitalSignsComponent } from './components/view-vital-signs/view-vital-signs.component';
import { AddAllergyComponent } from './components/add-allergy/add-allergy.component';
import { AddDiagnosisComponent } from './components/add-diagnosis/add-diagnosis.component';
import { AddMedicineComponent } from './components/add-medicine/add-medicine.component';
import { AddProcedureComponent } from './components/add-procedure/add-procedure.component';
import { AddVitalSignComponent } from './components/add-vital-signs/add-vital-sign.components';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AuthGuardGuard } from '../shared/service/auth-guard.guard';


const ADMIN_ROUTES: Routes = [

  {

    path: "employeeregistration",
    component: HospitalsUserRegisterComponent
  },
  {

    path: "dashboard",

    component: DashBoardComponent, canActivate: [AuthorizationCheck],

    children: [

      {

        path: "home",

        component: AdminHomeComponent

      },
      {
        path: "userlist",
        component: UserListComponent
      },
      {
        path: "patientuserlist",
        component: PatientUserListComponent
      },
      {
        path: "allergy",
        component: ViewAllergyComponent
      },
      {
        path: "diagnosis",
        component: ViewDiagnosisComponent
      },
      {
        path: "procedure",
        component: ViewProcedureComponent
      },
      {
        path: "medicine",
        component: ViewMedicineComponent
      },
      {
        path: "vitalsign",
        component: ViewVitalSignsComponent
      },
      {
        path: "",
        component: AdminHomeComponent
      }
    ]

  }

]


@NgModule({
  declarations: [HospitalsUserRegisterComponent, AdminHomeComponent, DashBoardComponent, UserListComponent, PatientUserListComponent, ViewAllergyComponent, ViewDiagnosisComponent, ViewMedicineComponent, ViewProcedureComponent, ViewVitalSignsComponent, AddAllergyComponent, AddDiagnosisComponent, AddMedicineComponent, AddProcedureComponent, AddVitalSignComponent],

  imports: [
    CommonModule,
    SharedModule,
   
    
    RouterModule.forChild(ADMIN_ROUTES)
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],

})
export class AdminModule { }
