import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { AllergyModel } from '../../models/allergy-model';

@Component({
  selector: 'app-view-allergy',
  templateUrl:'./view-allergy.component.html',
  styleUrls: ['./view-allergy.component.css']
})
export class ViewAllergyComponent implements OnInit {
    allergies:AllergyModel[];
    allergyTemp:AllergyModel[];
    selectedAllergy:AllergyModel;
    showPopUp:boolean=false;    

    temp:any=[];
    rows: any = [];  
    totalCount: Number = 0;  
    closeResult: string;  
    message:string;
    showMessage:boolean=true;
  
    dataParams: any = {  
      page_num: '',  
      page_size: ''  
    };  
  
    @ViewChild('allergyTable') allergyTable: DatatableComponent;
  
    constructor(private auth:AuthService,private util:UtilService) { }
  
    ngOnInit(): void {
      this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.getAllAllergies();
    }

    getAllAllergies(){
        this.auth.getAllAllergies().subscribe((res:AllergyModel[])=>{
            this.allergies=res;
            this.allergyTemp=res;
            this.rows=this.allergies;
            this.temp=this.rows;
            this.totalCount=this.allergies.length;
        });
    }

    updateFilter(event) {
      const val = event.toLowerCase();

      if(val!="")
      {
        this.allergies = this.allergies.filter(function (d:AllergyModel) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
         });
      }
      else{
        this.allergies=this.allergyTemp;
      }
      
      this.allergyTable.offset = 0;
    }

    openPopUp(value:any){
      if(value!=0)
      {
        this.auth.getAllergyById(value).subscribe((res:AllergyModel)=>{
          this.selectedAllergy=res;
          this.showPopUp=true;
        });
      }
      else{
        this.selectedAllergy=null;
        this.showPopUp=true;
      }
    }
    closePopUp(response:ResponseModel)
    {
      this.showPopUp=false;
      if(!response.isError)
      {
        this.getAllAllergies();
        this.util.showSuccess(response.Message);
      }
      else{
        this.util.showDanger(response.Message);
      }
    }
}
