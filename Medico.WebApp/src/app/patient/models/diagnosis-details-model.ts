import { DiagnosisModel } from "src/app/admin/models/diagnosis-model";

export interface diagnosisDetails{
    patientdiagnosisid?: number,
    diagnosisid : number,
    diagnosisnote : string,
    appointmentid : number,
    createdby : string,
    createddate : Date,
    modifiedby : string,
    modifieddate: Date,
    diagnosis?:DiagnosisModel
}