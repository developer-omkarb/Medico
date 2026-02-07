import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from '../../../auth.service';
import { AppointmentModel } from '../../../patient/models/appointments-model';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.component.html',
  styleUrls: ['./patient-visit-history.component.css']
})
export class PatientVisitHistoryComponent implements OnInit {
  @Input() patientId: number;
  appointments: AppointmentModel[];
  @ViewChild('apptTable') aaptTable: DatatableComponent;
  table_page_size = 10;
  totalCount: number;
  timeout: any;

  tempAppointmentsStorage: AppointmentModel[];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getPatientVisitHistory(this.patientId).subscribe(res => {
      
      this.appointments = res;
      if (this.appointments != null && this.appointments.length != 0) {
        this.appointments.forEach(appt => {
          appt.patientDiagnosis.forEach(dg => {
            this.auth.getDiagnosisById(dg.diagnosisid).subscribe(dgRes => {
              dg.diagnosis = dgRes;
            });
          });
          appt.patientProcedureDetails.forEach(pr => {
            this.auth.getProcedureById(pr.procedureid).subscribe(prRes => {
              pr.procedure = prRes;
            });
          });
          appt.patientPrescription.forEach(pres => {
            pres.medicinDetails.forEach(md => {
              this.auth.getMedicineById(md.medicinid).subscribe(mdRes => {
                md.medicin = mdRes;
              });
            });
          });
        });
      }
      
      this.totalCount = this.appointments.length;
      this.tempAppointmentsStorage = res;
    });
  }
  toggleExpandRow(row) {
    this.aaptTable.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }
}
