export interface HospitalUsers {
  id: number,
  doctorname: string
}

export interface UsersListModel {
  userid: number,
  username: string,
  role: string,
  name: string,
  //lastname: string,
  islocked: boolean,
  createdby: string,
  createddate: Date,
  status:string
}
