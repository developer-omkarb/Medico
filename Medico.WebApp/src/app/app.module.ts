import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DatePipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDetailComponent } from './patient/components/appointment-detail/appointment-detail.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMultiSelectModule,
  ],  
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
