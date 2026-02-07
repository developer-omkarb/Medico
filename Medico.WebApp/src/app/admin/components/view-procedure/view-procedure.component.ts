import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { ProcedureModel } from '../../models/procedure-model';

@Component({
  selector: 'app-view-procedure',
  templateUrl:'./view-procedure.component.html',
  styleUrls: ['./view-procedure.component.css']
})
export class ViewProcedureComponent implements OnInit {
    procedure:ProcedureModel[];
    procedureTemp:ProcedureModel[];
    selectedProcedure:ProcedureModel;
    showPopUp:boolean=false;    

    temp:any=[];
    rows: any = [];  
    totalCount: Number = 0;  
    closeResult: string;  
  
    dataParams: any = {  
      page_num: '',  
      page_size: ''  
    };  
  
    @ViewChild('procedureTable') procedureTable: DatatableComponent;
  
    constructor(private auth:AuthService,private util:UtilService) { }
  
    ngOnInit(): void {
      this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.getAllProcedures();
    }

    getAllProcedures(){
        this.auth.getAllProcedures().subscribe((res:ProcedureModel[])=>{
            this.procedure=res;
            this.procedureTemp=res;
            this.rows=this.procedure;
            this.temp=this.rows;
            this.totalCount=this.procedure.length;
        });
    }

    updateFilter(event) {
      const val = event.toLowerCase();

      if(val!="")
      {
        this.procedure = this.procedure.filter(function (d: ProcedureModel) {
          return (d.code.toLowerCase().indexOf(val) !== -1 || !val) || (d.approach.toLowerCase().indexOf(val) !== -1 || !val);
         });
      }
      else{
        this.procedure=this.procedureTemp;
      }
      
      this.procedureTable.offset = 0;
    }

    FilterByStatus(event){
      const val =event.target.checked as boolean;
      if(val)
      {
        this.procedure = this.procedure.filter(d=>d.isDeprecated== true);
        this.procedureTemp=this.procedure;
      }
      else{
        this.procedure = this.temp;
        this.procedureTemp=this.procedure;
      }
      this.procedureTable.offset = 0;
    }
    openPopUp(value:any){
      if(value!=0)
      {
        this.auth.getProcedureById(value).subscribe((res:ProcedureModel)=>{
          this.selectedProcedure=res;
          this.showPopUp=true;
        });
      }
      else{
        this.selectedProcedure=null;
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
          this.getAllProcedures();
          this.util.showSuccess(response.Message);
        }
        else{
          this.util.showDanger(response.Message);
        }
      }
    }
}
