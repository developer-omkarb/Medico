import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { AllergyModel } from '../../models/allergy-model';

@Component({
  selector: 'app-add-allergy',
  templateUrl:'./add-allergy.component.html',
  styleUrls: ['./add-allergy.component.css']
})
export class AddAllergyComponent implements OnInit {
    @ViewChild ('frame') public frame: any;

    @Input()
    allergy:AllergyModel;

    isAddMode:boolean;

    @Input()
    showPopUp:boolean

    @Output()
    onCloseEvent=new EventEmitter<any>();

    name=new FormControl('',[Validators.required]);
    type=new FormControl('',[Validators.required]);
    source=new FormControl('',[Validators.required]);
    partialsequences=new FormControl('',[Validators.required]);
    allerginicity=new FormControl('',[Validators.required]);

  allergyForm: FormGroup;
  email: string;

  constructor(private auth:AuthService,private fb:FormBuilder,private util:UtilService) {
    this.util.initializePopover();
    this.allergyForm=this.fb.group({
      name:this.name,
      type:this.type,
      source:this.source,
      partialsequences:this.partialsequences,
      allerginicity:this.allerginicity
    });
  }
  showPopover(event:Event,errParentNode : HTMLElement){
    this.util.showPopoverCopy(event,errParentNode);
  }
  ngOnInit(): void {
    var userDetails = JSON.parse(sessionStorage.getItem("user"));
    this.email = userDetails.username;
      if(this.allergy!=null)
      {
        this.isAddMode=false;
      }
      else{
        this.isAddMode=true;
      }

      if (!this.isAddMode) {
        
        this.allergyForm.patchValue(this.allergy);
    }
    }
    closePopUp()
    {
      this.onCloseEvent.emit(null);
    }
    saveAllergyDetails(){
      const {name:iName,source:iSource,type:iType,partialsequences:iPartialsequences,allerginicity:iAllerginicity}=this.allergyForm.value;
      let request:AllergyModel={
        allergyid: 0,
        type:iType,
        name: iName,
        source: iSource,
        partialsequences: iPartialsequences,
        allerginicity: iAllerginicity,
        createdby: this.email,
        createddate: new Date(),
        modifiedby: this.email,
        modifieddate: new Date()

        
      };
      if(this.isAddMode)
      {
        this.auth.addAllergy(request).subscribe((res:AllergyModel)=>{
          let response:ResponseModel;
          if(res!=null)
          {
            response={
              isError:false,
              Message:"Allergy details added"
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
        request.allergyid=this.allergy.allergyid;
        this.auth.updateAllergy(request).subscribe((res:any)=>{
          if(res!=null)
          {
            let objRes:ResponseModel;
            if(res.status.toLowerCase()=='success'){
              objRes={
                isError:false,
                Message:"Allergy details updated"
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
