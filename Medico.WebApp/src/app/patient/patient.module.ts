import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewAppointmentsComponent } from './components/view-appointments/view-appointments.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { DiagnosisDetailsComponent } from './components/diagnosis-details/diagnosis-details.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { VitalSignsDetailsComponent } from './components/vital-signs-details/vital-signs-details.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
import { AccordionModule, CollapseModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { PrescriptionTemplateComponent } from './components/prescription-template/prescription-template.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationCheck } from '../shared/service/authorizationCheck';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';
import { VitalSignsComponent } from './components/vital-signs/vital-signs.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { SchedularComponent } from '../shared/components/schedular/schedular.component';
import { AddMedicationComponent } from './components/add-medication/add-medication.component';
import { ProcedureDetailsComponent } from './components/procedure-details/procedure-details.component';
import { AuthErrorComponent } from '../shared/components/auth-error/auth-error.component';


const PATIENT_ROUTES: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent, canActivate: [AuthorizationCheck],
    children: [
      {
        path: "appointments",
        component: ViewAppointmentsComponent
      },
      {
        path: "",
        component: DashboardHomeComponent
      }
      ,
      {
        path: "home",
        component: DashboardHomeComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "patient-visit-details/:id",
        component: PatientVisitDetailsComponent,
      },
      {
        path: "schedular",
        component: SchedularComponent
      },
      {
        path: "medication",
        component: AddMedicationComponent
      }
    ]
  },
  {
    path: "appointments",
    component: ViewAppointmentsComponent
  },
  {
    path: "appointment-details/:id",
    component: AppointmentDetailComponent
  },
  {
    path: "view-prescription/:id",
    component: PrescriptionTemplateComponent
  },
  {
    path: "error",
    component: AuthErrorComponent
  }

]


@NgModule({
  declarations: [DashboardComponent,
    DashboardHomeComponent,
    ViewAppointmentsComponent,
    AppointmentsListComponent,
    DiagnosisDetailsComponent,
    PrescriptionsComponent,
    ProceduresComponent,
    VitalSignsDetailsComponent,
    AppointmentDetailComponent,
    PrescriptionTemplateComponent, ProfileComponent, PatientVisitDetailsComponent, VitalSignsComponent, DiagnosisComponent,AddMedicationComponent, ProcedureDetailsComponent],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PATIENT_ROUTES),
    NgbAccordionModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    TabsModule.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  // providers:[NgbModule,NgbPanelContent],
  exports: []
})
export class PatientModule { }
