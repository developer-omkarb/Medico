import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErroriconComponent } from './components/erroricon/erroricon.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { VitalsignsBarComponent } from './components/vitalsigns-bar/vitalsigns-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ChartsModule, MDBBootstrapModule, WavesModule} from 'angular-bootstrap-md';
import { ErrorIconComponent } from './components/error-icon/error-icon.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import {  NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { httpInterceptor } from './Interceptor/httpInterceptor';
import { ErrorInterceptor } from './Interceptor/errorInterceptor';
import { AuthorizationCheck } from './service/authorizationCheck';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CountPanelComponent } from './components/count-panel/count-panel.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { InfiniteScrollerComponent } from './components/infinite-scroller/infinite-scroller.component';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DoctorSearchCardComponent } from './components/doctor-search-card/doctor-search-card.component';
import {TableSearchComponent} from './components/table-search/table-search.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DoctorAppointmentDetailComponent } from './components/doctor-appointment-detail/doctor-appointment-detail.component';
import { VitalSignsDetailsComponent } from './components/vital-signs-details/vital-signs-details.component';
import { DiagnosisDetailsComponent } from './components/diagnosis-details/diagnosis-details.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { PrescriptionTemplateComponent } from './components/prescription-template/prescription-template.component';
import { ViewPatientInfoComponent } from './components/view-patient-info/view-patient-info.component';
import { EditAppointmentTableComponent } from './components/edit-appointment-table/edit-appointment-table.component';
import { EditAppointmentsComponent } from './components/edit-appointments/edit-appointments.component';
import { SchedularComponent } from './components/schedular/schedular.component';
import { EditAppointmentFormComponent } from './components/edit-appointment-form/edit-appointment-form.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { ViewPatientVisitHistoryComponent } from './components/view-patient-visit-history/view-patient-visit-history.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AuthErrorComponent } from './components/auth-error/auth-error.component';
import { NotificationSidetabComponent } from './components/notification-sidetab/notification-sidetab.component';
import { TwelvehourformatPipe } from './pipes/twelvehourformat.pipe';
import { StatusColorsComponent } from './components/status-colors/status-colors.component';


@NgModule({
  
  declarations: [ErroriconComponent, ErrorIconComponent, FooterComponent, HeaderComponent, SidemenuComponent, VitalsignsBarComponent,
    LoaderComponent, ToastContainerComponent, NavbarComponent, SearchBarComponent, InfiniteScrollerComponent, DoctorSearchCardComponent, PieChartComponent, CountPanelComponent, TableSearchComponent,
    DoctorAppointmentDetailComponent, VitalSignsDetailsComponent, DiagnosisDetailsComponent,
    ProceduresComponent, PrescriptionsComponent, PrescriptionTemplateComponent, ViewPatientInfoComponent,
    EditAppointmentTableComponent, EditAppointmentsComponent, SchedularComponent, EditAppointmentFormComponent, PatientVisitHistoryComponent, ViewPatientVisitHistoryComponent, AddUserComponent, AuthErrorComponent, NotificationSidetabComponent, TwelvehourformatPipe, StatusColorsComponent ],
  
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    Ng2TelInputModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    NgbToastModule,
    ChartsModule,
    WavesModule,
	TabsModule.forRoot(),
    NgbToastModule,
    NgxDatatableModule,
    MatListModule,
    MatMenuModule,
    InfiniteScrollModule,
    AngularMultiSelectModule
   
  ],

  exports:[SidemenuComponent,ErroriconComponent,VitalsignsBarComponent,ErrorIconComponent,LoaderComponent,ToastContainerComponent,BsDatepickerModule,NavbarComponent,HeaderComponent,ErrorIconComponent,SearchBarComponent,InfiniteScrollerComponent,TableSearchComponent,EditAppointmentsComponent,SchedularComponent,NotificationSidetabComponent,StatusColorsComponent,
    TwelvehourformatPipe,
    FormsModule,
    BsDatepickerModule,
    Ng2TelInputModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    TabsModule,
    NgbToastModule,
    ChartsModule,
    WavesModule,
    PieChartComponent,
    CountPanelComponent,
    NgxDatatableModule,
    InfiniteScrollModule,
    DoctorAppointmentDetailComponent,
    PrescriptionTemplateComponent,
    ViewPatientInfoComponent,
    EditAppointmentFormComponent,
    PatientVisitHistoryComponent,
    ViewPatientVisitHistoryComponent,
    AddUserComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA],
  providers:[
    {provide:HTTP_INTERCEPTORS, useClass:httpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor,multi:true},
    AuthorizationCheck
  ]

})
export class SharedModule { }
