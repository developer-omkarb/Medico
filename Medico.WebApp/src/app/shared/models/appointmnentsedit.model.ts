export interface AppointmnentsEditModel {
  appointmentDate: string
  appointmentId: number
  appointmentStatus: string
  appointmentStatusId: number
  appointmentTime: string
  appointmentTitle: string
  createdBy: string
  createdDate: string
  description: string
  modifiedBy: string
  modifiedDate: Date
  nurseId: number
  nurseName: string
  patientId: number
  patientName: string
  physicianId: number
  physicianName: string
  rejectCancelReason: string
  timeslotId: number
}

export const DefaultAppointmentData={
  appointmentDate: "2022-04-06T00:00:00",
appointmentId: 77,
appointmentStatus: "Awaited",
appointmentStatusId: 3,
appointmentTime: "12:00",
appointmentTitle: "Fever Code",
createdBy: "vampire.g.1499@gmail.com",
createdDate: "2022-04-04T00:00:00",
description: null,
modifiedBy: "",
modifiedDate: null,
nurseId: "",
nurseName: "Not Assigned",
patientId: 1,
patientName: "vampire G1499",
physicianId: 9,
physicianName: "Meenakshi Sinha",
rejectCancelReason: "",
timeslotId: 3
}
