import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { MedicineModel } from '../../models/medicine-model';

@Component({
  selector: 'app-add-medicine',
  templateUrl:'./add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {
    @Input()
    medicine:MedicineModel;

    isAddMode:boolean;

    @Input()
    showPopUp:boolean

    @Output()
    onCloseEvent=new EventEmitter<any>();

    appno=new FormControl('',[Validators.required]);
    medicinnumber=new FormControl('',[Validators.required]);
    form=new FormControl('',[Validators.required]);
    strength=new FormControl('',[Validators.required]);
    referencedrug=new FormControl('',[Validators.required]);
    drugname=new FormControl('',[Validators.required]);
    activeingredient=new FormControl('',[Validators.required]);
    isDeprecated=new FormControl(false);

    medicineForm:FormGroup;
  email: string;
  constructor(private auth:AuthService,private fb:FormBuilder,private util:UtilService) {
    this.util.initializePopover();
    this.medicineForm=this.fb.group({
      appno:this.appno,
      medicinnumber:this.medicinnumber,
      form:this.form,
      strength:this.strength,
      referencedrug:this.referencedrug,
      drugname:this.drugname,
      activeingredient:this.activeingredient,
      isDeprecated:this.isDeprecated
    });
  }
  showPopover(event:Event,errParentNode : HTMLElement){
    this.util.showPopoverCopy(event,errParentNode);
  }
  ngOnInit(): void {
    var userDetails = JSON.parse(sessionStorage.getItem("user"));
    this.email = userDetails.username;
      if(this.medicine!=null)
      {
        this.isAddMode=false;
      }
      else{
        this.isAddMode=true;
      }

      if (!this.isAddMode) {
        console.log("MEDICIEN",this.medicine);
        this.medicineForm.patchValue(this.medicine);
    }
    }
    closePopUp()
    {
      this.onCloseEvent.emit(null);
    }
    saveMedicineDetails(){
      const {appno:iAppno,medicinnumber:iMedicinnumber,form:IForm,strength:Istrength,referencedrug:IReferenceDrug,drugname:IDrugName,activeingredient:IActiveIngredient,isDeprecated:IisDepracated}=this.medicineForm.value;
      let request:MedicineModel={
        medicinid: 0,
        medicinnumber:iMedicinnumber,
        appno:iAppno,
        form:IForm,
        referencedrug:IReferenceDrug,
        strength:Istrength,
        drugname:IDrugName,
        activeingredient:IActiveIngredient,
        isDeprecated: IisDepracated,
        createdby: this.email,
        createddate: new Date(),
        modifiedby: this.email,
        modifieddate: new Date()
      };
      if(this.isAddMode)
      {
        this.auth.addMedicine(request).subscribe((res:MedicineModel)=>{
          let response:ResponseModel;
          if(res!=null)
          {
            response={
              isError:false,
              Message:"Medicine details added"
            };
          }
          else{
            response={
              isError:true,
              Message:"Operation failed. Try again"
            };
          }
          this.onCloseEvent.emit(response);
        },error=>{
          let response:ResponseModel={
            isError:true,
            Message:error.message
          };
        this.onCloseEvent.emit(response);
        });
      }
      else{
        request.medicinid=this.medicine.medicinid;
        this.auth.updateMedicine(request).subscribe((res:any)=>{
          if(res!=null)
          {
            let objRes:ResponseModel;
            if(res.status.toLowerCase()=='success'){
              objRes={
                isError:false,
                Message:"Medicine details updated"
              };
            }
            else{
              objRes={
                isError:true,
                Message:"Operation failed. Try again"
              };
            }
            this.onCloseEvent.emit(objRes);
          }
        },error=>{
          let response:ResponseModel={
            isError:true,
            Message:error.message
          };
        this.onCloseEvent.emit(response);
      });
      }
    }
}
