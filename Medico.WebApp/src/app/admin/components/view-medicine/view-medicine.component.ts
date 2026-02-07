import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { MedicineModel } from '../../models/medicine-model';

@Component({
  selector: 'app-view-medicine',
  templateUrl:'./view-medicine.component.html',
  styleUrls: ['./view-medicine.component.css']
})
export class ViewMedicineComponent implements OnInit {
    medicines:MedicineModel[];
    medTemp:MedicineModel[];
    selectedMedicine:MedicineModel;
    showPopUp:boolean=false;    

    temp:MedicineModel[]=[];
    rows: MedicineModel[] = [];  
    totalCount: Number = 0;  
    closeResult: string;  
  
    dataParams: any = {  
      page_num: '',  
      page_size: ''  
    };  
  
    @ViewChild('medicineTable') medicineTable: DatatableComponent;
  
    constructor(private auth:AuthService,private util:UtilService) { }
  
    ngOnInit(): void {
      this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.getAllMedicines();
    }

    getAllMedicines(){
        this.auth.getAllMedicines().subscribe((res:MedicineModel[])=>{
            this.medicines=res;
            this.medTemp=res;
            this.rows=this.medicines;
            this.temp=this.rows;
            this.totalCount=this.medicines.length;
        });
    }

    updateFilter(event) {
      const val = event.toLowerCase();

      if(val!="")
      {
        this.medicines = this.medicines.filter(function (d: MedicineModel) {
          return (d.drugname.toLowerCase().indexOf(val) !== -1 || !val) || (d.appno.toString().toLowerCase().indexOf(val) !== -1 || !val);
         });
      }
      else{
        this.medicines=this.medTemp;
      }
      
      this.medicineTable.offset = 0;
    }

    FilterByStatus(event){
      const val =event.target.checked as boolean;
      if(val)
      {
        this.medicines = this.medicines.filter(d=>d.isDeprecated== true);
        this.medTemp=this.medicines;
      }
      else{
        this.medicines = this.temp;
        this.medTemp=this.medicines;
      }
      this.medicineTable.offset = 0;
    }

    openPopUp(value:any){
      if(value!=0)
      {
        this.auth.getMedicineById(value).subscribe((res:MedicineModel)=>{
          this.selectedMedicine=res;
          this.showPopUp=true;
        });
      }
      else{
        this.selectedMedicine=null;
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
          this.getAllMedicines();
          this.util.showSuccess(response.Message);
        }
        else{
          this.util.showDanger(response.Message);
        }
      }
    }
}
