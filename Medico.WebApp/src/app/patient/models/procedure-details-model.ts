import { ProcedureModel } from "src/app/admin/models/procedure-model";

export interface procedureDetails{
    patientprocedureid?: number,
    procedureid : number,
    procedurenote : string,
    appointmentid : number,
    createdby : string,
    createddate : Date,
    modifiedby : string,
    modifieddate : Date,
    procedure?:ProcedureModel
}