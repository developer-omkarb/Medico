import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DiagnosisModel } from 'src/app/admin/models/diagnosis-model';
import { AuthService } from 'src/app/auth.service';
import { AppointmentModel } from '../../../patient/models/appointments-model';
import { diagnosisDetails } from '../../../patient/models/diagnosis-details-model';


@Component({
  selector: 'app-diagnosis-details',
  templateUrl: './diagnosis-details.component.html',
  styleUrls: ['./diagnosis-details.component.css']
})
export class DiagnosisDetailsComponent implements AfterViewInit {
  @Input()
  appointment:AppointmentModel;
  diagnosis:diagnosisDetails[];
  temp:any=[];
  rows: any = [];  
  totalCount: Number = 0;  
  closeResult: string;  
  
  dataParams: any = {  
      page_num: '',  
      page_size: ''  
  };  
  
  @ViewChild('diagnosisTable') diagnosisTable: DatatableComponent;
  
  constructor(private auth:AuthService) { }
  
  ngAfterViewInit():void{
    this.getDiagnosisData();
  }
  getDiagnosisData()
  {
    this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.rows=this.appointment.patientDiagnosis;
      this.temp=this.rows;
      this.totalCount=this.appointment.patientDiagnosis.length;
      this.appointment.patientDiagnosis.forEach(dg=>{
        this.auth.getDiagnosisById(dg.diagnosisid).subscribe(res=>{
          dg.diagnosis=res;
        });
      });
  }
}
