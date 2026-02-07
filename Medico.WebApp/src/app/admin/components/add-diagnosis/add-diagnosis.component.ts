import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { DiagnosisModel } from '../../models/diagnosis-model';

@Component({
  selector: 'app-add-diagnosis',
  templateUrl:'./add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.css']
})
export class AddDiagnosisComponent implements OnInit {
    @Input()
    diagnosis:DiagnosisModel;

    isAddMode:boolean;

    @Input()
    showPopUp:boolean

    @Output()
    onCloseEvent=new EventEmitter<any>();

    code=new FormControl('',[Validators.required]);
    description=new FormControl('',[Validators.required]);
    isDeprecated=new FormControl(false);
  email: string;
    diagnosisForm:FormGroup;

  constructor(private auth:AuthService,private fb:FormBuilder,private util:UtilService) {
    this.util.initializePopover();
    this.diagnosisForm=this.fb.group({
      code:this.code,
      description:this.description,
      isDeprecated:this.isDeprecated
    });
  }
  showPopover(event:Event,errParentNode : HTMLElement){
    this.util.showPopoverCopy(event,errParentNode);
  }
  ngOnInit(): void {
    var userDetails = JSON.parse(sessionStorage.getItem("user"));
    this.email = userDetails.username;
      if(this.diagnosis!=null)
      {
        this.isAddMode=false;
      }
      else{
        this.isAddMode=true;
      }

      if (!this.isAddMode) {
        
        this.diagnosisForm.patchValue(this.diagnosis);
    }
    }
    closePopUp()
    {
      this.onCloseEvent.emit(null);
    }
    saveDiagnosisDetails(){
      const {code:iCode,description:iDescription,isDeprecated:IisDepracated}=this.diagnosisForm.value;
      let request:DiagnosisModel={
        diagnosisid: 0,
        code:iCode,
        description:iDescription,
        isDeprecated: IisDepracated,
        createdby: this.email,
        createddate: new Date(),
        modifiedby: this.email,
        modifieddate: new Date()
      };
      if(this.isAddMode)
      {
        this.auth.addDiagnosis(request).subscribe((res:DiagnosisModel)=>{
          let response:ResponseModel;
          if(res!=null)
          {
            response={
              isError:false,
              Message:"Diagnosis details added"
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
        request.diagnosisid=this.diagnosis.diagnosisid;
        this.auth.updateDiagnosis(request).subscribe((res:any)=>{
          if(res!=null)
          {
            let objRes:ResponseModel;
            if(res.status.toLowerCase()=='success'){
              objRes={
                isError:false,
                Message:"Diagnosis details updated"
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
