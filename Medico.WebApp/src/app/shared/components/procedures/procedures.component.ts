import { AfterViewInit, Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ProcedureModel } from 'src/app/admin/models/procedure-model';
import { AuthService } from 'src/app/auth.service';
import { AppointmentModel } from '../../../patient/models/appointments-model';


@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements AfterViewInit {
  @Input()
  appointment:AppointmentModel;
  temp:any=[];
  rows: any = [];  
  totalCount: Number = 0;  
  closeResult: string;  
  
  dataParams: any = {  
      page_num: '',  
      page_size: ''  
  };  
  
  constructor(private auth: AuthService) { }

  ngAfterViewInit(): void {
    console.log("PROC",this.appointment);
    this.appointment.patientProcedureDetails.forEach(proc=>{
      this.auth.getProcedureById(proc.procedureid).subscribe((res:ProcedureModel)=>{
        proc.procedure=res;
      });
    });
    this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.rows=this.appointment.patientProcedureDetails;
      this.temp=this.rows;
      this.totalCount=this.appointment.patientProcedureDetails.length;
  }

}
