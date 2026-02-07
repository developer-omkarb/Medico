import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { VitalSignsModel } from '../../models/vital-signs-model';

@Component({
  selector: 'app-view-vital-signs',
  templateUrl:'./view-vital-signs.component.html',
  styleUrls: ['./view-vital-signs.component.css']
})
export class ViewVitalSignsComponent implements OnInit {
    vitalSigns:VitalSignsModel[];
    selectedVitalSigns:VitalSignsModel;
    showPopUp:boolean=false;    

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
  
    ngOnInit(): void {
      this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.getAllVitalSigns();
    }

    getAllVitalSigns(){
        this.auth.getAllVitalSigns().subscribe((res:VitalSignsModel[])=>{
            this.vitalSigns=res;
            this.rows=this.vitalSigns;
            this.temp=this.rows;
            this.totalCount=this.vitalSigns.length;
        });
    }

    updateFilter(event) {
      const val = event.toLowerCase();

      if(val!="")
      {
        this.vitalSigns = this.vitalSigns.filter(function (d:VitalSignsModel) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
         });
      }
      else{
        this.vitalSigns=this.temp;
      }
      
      this.vitalsignsTable.offset = 0;
    }
    openPopUp(value:any){
      if(value!=0)
      {
        this.auth.getVitalSignById(value).subscribe((res:VitalSignsModel)=>{
          this.selectedVitalSigns=res;
          this.showPopUp=true;
        });
      }
      else{
        this.selectedVitalSigns=null;
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
          this.getAllVitalSigns();
          this.util.showSuccess(response.Message);
        }
        else{
          this.util.showDanger(response.Message);
        }
      }
    }
}
