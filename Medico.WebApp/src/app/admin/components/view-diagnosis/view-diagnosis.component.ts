import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { DiagnosisModel } from '../../models/diagnosis-model';

@Component({
  selector: 'app-view-diagnosis',
  templateUrl:'./view-diagnosis.component.html',
  styleUrls: ['./view-diagnosis.component.css']
})
export class ViewDiagnosisComponent implements OnInit {
    diagnosis:DiagnosisModel[];
    diagnosisTemp:DiagnosisModel[];
    selectedDiagnosis:DiagnosisModel;
    showPopUp:boolean=false;    

    temp:any=[];
    rows: any = [];  
    totalCount: Number = 0;  
    closeResult: string;  
  
    dataParams: any = {  
      page_num: '',  
      page_size: ''  
    };  
  
    @ViewChild('diagnosisTable') diagnosisTable: DatatableComponent;
  
    constructor(private auth:AuthService,private util:UtilService) { }
  
    ngOnInit(): void {
      this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.getAllDiagnosis();
    }

    getAllDiagnosis(){
        this.auth.getAllDiagnosis().subscribe((res:DiagnosisModel[])=>{
          this.diagnosis = res;
          console.log("Diagnosis", this.diagnosis);
            this.diagnosisTemp=res;
            this.rows=this.diagnosis;
            this.temp=this.rows;
            this.totalCount=this.diagnosis.length;
        });
    }

    updateFilter(event) {
      const val = event.toLowerCase();

      if(val!="")
      {
        this.diagnosis = this.diagnosis.filter(function (d: DiagnosisModel) {
          return (d.code.toLowerCase().indexOf(val) !== -1 || !val) || (d.description.toLowerCase().indexOf(val) !== -1 || !val);
         });
      }
      else{
        this.diagnosis=this.diagnosisTemp;
      }
      
      this.diagnosisTable.offset = 0;
    }

    FilterByStatus(event){
      const val =event.target.checked as boolean;
      if(val)
      {
        this.diagnosis = this.diagnosis.filter(d=>d.isDeprecated== true);
        this.diagnosisTemp=this.diagnosis;
      }
      else{
        console.log("Entered for false");
        this.diagnosis = this.temp;
        this.diagnosisTemp=this.diagnosis;
      }
      this.diagnosisTable.offset = 0;
    }
    openPopUp(value:any){
      if(value!=0)
      {
        this.auth.getDiagnosisById(value).subscribe((res:DiagnosisModel)=>{
          this.selectedDiagnosis=res;
          this.showPopUp=true;
        });
      }
      else{
        this.selectedDiagnosis=null;
        this.showPopUp=true;
      }
    }
    closePopUp(response:ResponseModel)
    {
      this.showPopUp=false;
      if(response!=null)
      {
        if(!response.isError)
        {
          this.getAllDiagnosis();
          this.util.showSuccess(response.Message);
        }
        else{
          this.util.showDanger(response.Message);
        }
      }
    }
}
