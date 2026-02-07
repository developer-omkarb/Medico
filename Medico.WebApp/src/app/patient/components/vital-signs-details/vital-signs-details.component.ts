import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { VitalSignsModel } from 'src/app/admin/models/vital-signs-model';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { AppointmentModel } from '../../models/appointments-model';
import { PatientVitalSigns, PatientVitalSignsDetails } from '../../models/patient-vital-signs-model';

@Component({
  selector: 'app-vital-signs-details',
  templateUrl: './vital-signs-details.component.html',
  styleUrls: ['./vital-signs-details.component.css']
})
export class VitalSignsDetailsComponent implements AfterViewInit {
  @Input()
  appointment:AppointmentModel;
  vitalSignMaster:VitalSignsModel[];
  vitalsigns:PatientVitalSignsDetails[]=[]; 
  temp:any=[];
  rows: any = [];  
  totalCount: Number = 0;  
  closeResult: string;  
  
  dataParams: any = {  
      page_num: '',  
      page_size: ''  
  };  
  
  @ViewChild('vitalsignsTable') vitalsignsTable: DatatableComponent;
  
  constructor(private auth:AuthService,private util:UtilService) { }
  ngAfterViewInit(): void {
    this.auth.getAllVitalSigns().subscribe(vs=>{
      this.vitalSignMaster=vs;
      this.vitalsigns=JSON.parse(this.appointment.patientVisitDetails[0].vitalsigns);
      this.vitalsigns.forEach(sign=>{
        sign.unit=this.vitalSignMaster.find(x=>x.vitalsignid==sign.vitalsignid).unit;
      });
      this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.rows=this.appointment.patientVisitDetails;
      this.temp=this.rows;
      this.totalCount=this.vitalsigns.length;
    })
  }
  
}
