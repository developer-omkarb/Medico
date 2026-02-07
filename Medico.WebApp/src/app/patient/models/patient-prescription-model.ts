import { MedicineModel } from "../../admin/models/medicine-model";

export class PatientMedicineDetails {
  patientprescriptionid?: number;
  medicinid: number;
  dosagedetails: string;
  prescriptionnote: string;
  appointmentid: number;
  createdby?: string;
  createddate?: Date;
  modifiedby?: string;
  modifieddate?: Date;
  medicin?: MedicineModel
}

export class PatientPrescriptionModel {
  patientprescriptionid?: number;
  appointmentid: number;
  createdby?: string;
  createddate?: Date;
  modifiedby?: string;
  modifieddate?: Date;
  medicinDetails: PatientMedicineDetails[];
}
