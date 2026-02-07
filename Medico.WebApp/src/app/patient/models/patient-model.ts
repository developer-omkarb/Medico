export interface PatientModel {
  patientId: string,
  titleId: string,
  firstName: string,
  lastName: string,
  dob: Date,
  city?: string,
  empId?: string,
  contactNumber: string,
  dialcode: string,
  gender: string,
  race?: string,
  ethinicity?: string,
  languageKnown?: string,
  address?: string,
  emergencyContactId?: string,
  allergiesDetailId?: string,
  UserId: string
}
