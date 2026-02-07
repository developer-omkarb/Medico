import { Data } from "@angular/router";
import { DiagnosisModel } from "src/app/admin/models/diagnosis-model";
import { MedicineModel } from "src/app/admin/models/medicine-model";
import { ProcedureModel } from "src/app/admin/models/procedure-model";
import { Employee, Patient } from "src/app/user/models/user-model";
import { diagnosisDetails } from "./diagnosis-details-model";
import { PatientModel } from "./patient-model";
import { PatientPrescriptionModel } from "./patient-prescription-model";
import { PatientVitalSigns } from "./patient-vital-signs-model";
import { procedureDetails } from "./procedure-details-model";



export interface Appointmnents {
  appointmentId: number,
  appointmentstatusid: AppointmentStatus,
  appointmentstatus?: string,
  title: string,
  patientid: number,
  physicianid: number,
  nurseid: string,
  createdby: string,
  createddate: Date,
  modifiedby: string,
  modifieddate: Date,
  appointmentdate: Date,
  physicianName: string,
  patient: PatientModel,
  diagnosis: Diagnosis[],
  prescription: Prescriptions,
  vitalsigns: VitalSigns,
  procedures: Procedures[]
}

export class AppointmentModel {
  appointmentid: number;
  appointmentstatusid: number;
  title: string;
  patientid?: number;
  physicianid?: number;
  nurseid?: number;
  createdby: string;
  createddate: Date;
  modifiedby: string;
  modifieddate?: Date;
  apptdate?: Date;
  timeslotid?: number;
  description: string;
  appointmentstatus: AppointmentStatusModel;
  nurse: Employee;
  patient: Patient;
  physician: Employee;
  timeslot: AppointmentTimeslotsMaster;
  patientDiagnosis: diagnosisDetails[];
  patientPrescription: PatientPrescriptionModel[];
  patientProcedureDetails: procedureDetails[];
  patientVisitDetails: PatientVitalSigns[];
  doctorname?: string;
  nursename?: string;
}
export interface Diagnosis {
  patientdiagnosisid: number,
  diagnosisid: number,
  diagnosisnote: string,
  appointmentid: number,
  createdby: number,
  createddate: Date,
  modifiedby: number,
  modifieddate: Date,
  diagnosis:DiagnosisModel;

}
export interface VitalSigns {
  patientvisitdetailid: number,
  appointmentid: number,
  vitalsigns: string,
  patientprescriptionid: number,
  createdby: number,
  createddate: Date,
  modifiedby: number,
  modifieddate: Date
}
export interface VitalSignsDetails {
  vitalsignid: number,
  value: number,
  unit: string
}

export interface Prescriptions {
  patientprescriptionid: number,
  appointmentid: number,
  createdby: number,
  createddate: Date,
  modifiedby: number,
  modifieddate: Date,
  medicinDetails: MedicineDetails[]
}

export interface MedicineDetails {
  patientprescriptionid: number,
  medicinedetailid: number,
  medicineid: number,
  dosageDetails: string,
  prescriptionnote: string,
  medicin:MedicineModel
}

export interface Procedures {
  patientprocedureid: number,
  procedureid: number,
  procedurenote: string,
  appointmentid: number,
  createdby: string,
  createddate: Date,
  modifiedby: string,
  modifieddate: Date,
  procedure:ProcedureModel
}
export enum AppointmentStatus {
  Confirmed = 1,
  Declined = 2
}
export class AppointmentStatusModel{
  appointmentstatusid:number;
  name:string;
}
export class AppointmentTimeslotsMaster{
  timeslotid:number;
  value:string;
}
