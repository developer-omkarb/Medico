import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { VitalSignsModel } from '../../models/vital-signs-model';

@Component({
  selector: 'app-add-vital-sign',
  templateUrl:'./add-vital-sign.components.html',
  styleUrls: ['./add-vital-sign.components.css']
})
export class AddVitalSignComponent implements OnInit {
    @Input()
    vitalSign:VitalSignsModel;

    isAddMode:boolean;

    @Input()
    showPopUp:boolean

    @Output()
    onCloseEvent=new EventEmitter<any>();

    name=new FormControl('',[Validators.required]);
    unit=new FormControl('',[Validators.required]);

    vitalsignForm:FormGroup;
  email: string;
  constructor(private auth:AuthService,private fb:FormBuilder,private util:UtilService) {
    this.util.initializePopover();
    this.vitalsignForm=this.fb.group({
      name:this.name,
      unit:this.unit
    });
  }
  showPopover(event:Event,errParentNode : HTMLElement){
    this.util.showPopoverCopy(event,errParentNode);
  }
  ngOnInit(): void {
    var userDetails = JSON.parse(sessionStorage.getItem("user"));
    this.email = userDetails.username;
      if(this.vitalSign!=null)
      {
        this.isAddMode=false;
      }
      else{
        this.isAddMode=true;
      }

      if (!this.isAddMode) {
        
        this.vitalsignForm.patchValue(this.vitalSign);
    }
    }
    closePopUp()
    {
      this.onCloseEvent.emit(null);
    }
    saveVitalSignDetails(){
      const {name:iName,unit:iUnit}=this.vitalsignForm.value;
      let request:VitalSignsModel={
        vitalsignid: 0,
        name:iName,
        unit: iUnit,
        createdby: this.email,
        createddate: new Date(),
        modifiedby: this.email,
        modifieddate: new Date()
      };
      if(this.isAddMode)
      {
        this.auth.addVitalSign(request).subscribe((res:VitalSignsModel)=>{
          let response:ResponseModel;
          if(res!=null)
          {
            response={
              isError:false,
              Message:"Vital sign details added"
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
        request.vitalsignid=this.vitalSign.vitalsignid;
        this.auth.updateVitalSign(request).subscribe((res:any)=>{
          if(res!=null)
          {
            let objRes:ResponseModel;
            if(res.status.toLowerCase()=='success'){
              objRes={
                isError:false,
                Message:"Vital sign details updated"
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
