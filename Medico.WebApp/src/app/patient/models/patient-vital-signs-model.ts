export interface PatientVitalSigns {
    patientvisitdetailid: number,
    appointmentid: number,
    vitalsigns: string,
    createdby: string,
    createddate: Date,
    modifiedby: string,
    modifieddate: Date,
    appointment : {
        Description : string
    }
  }

  export interface PatientVitalSignsDetails {
    vitalsignid: number,
    name: string,
    value: number,
    unit?: string
  }
