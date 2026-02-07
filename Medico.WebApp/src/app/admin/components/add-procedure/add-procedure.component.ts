import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { ProcedureModel } from '../../models/procedure-model';

@Component({
  selector: 'app-add-procedure',
  templateUrl:'./add-procedure.component.html',
  styleUrls: ['./add-procedure.component.css']
})
export class AddProcedureComponent implements OnInit {
    @Input()
    procedure:ProcedureModel;

    isAddMode:boolean;

    @Input()
    showPopUp:boolean

    @Output()
    onCloseEvent=new EventEmitter<any>();

    code=new FormControl('',[Validators.required]);
    approach=new FormControl('',[Validators.required]);
    isDeprecated=new FormControl(false);
  email: string;
    procedureForm:FormGroup;

  constructor(private auth:AuthService,private fb:FormBuilder,private util:UtilService) {
    this.util.initializePopover();
    this.procedureForm=this.fb.group({
      code:this.code,
      approach:this.approach,
      isDeprecated:this.isDeprecated
    });
  }
  showPopover(event:Event,errParentNode : HTMLElement){
    this.util.showPopoverCopy(event,errParentNode);
  }
  ngOnInit(): void {
    var userDetails = JSON.parse(sessionStorage.getItem("user"));
    this.email = userDetails.username;
      if(this.procedure!=null)
      {
        this.isAddMode=false;
      }
      else{
        this.isAddMode=true;
      }

      if (!this.isAddMode) {
        
        this.procedureForm.patchValue(this.procedure);
    }
    }
    closePopUp()
    {
      this.onCloseEvent.emit(null);
    }
    saveProcedureDetails(){
      const {code:iCode,approach:iApproach,isDeprecated:IisDepracated}=this.procedureForm.value;
      let request:ProcedureModel={
        procedureid: 0,
        code:iCode,
        approach:iApproach,
        isDeprecated: IisDepracated,
        createdby: this.email,
        createddate: new Date(),
        modifiedby: this.email,
        modifieddate: new Date()
      };
      if(this.isAddMode)
      {
        this.auth.addProcedure(request).subscribe((res:ProcedureModel)=>{
          let response:ResponseModel;
          if(res!=null)
          {
            response={
              isError:false,
              Message:"Procedure details added"
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
        request.procedureid=this.procedure.procedureid;
        this.auth.updateProcedure(request).subscribe((res:any)=>{
          if(res!=null)
          {
            let objRes:ResponseModel;
            if(res.status.toLowerCase()=='success'){
              objRes={
                isError:false,
                Message:"Procedure details updated"
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
