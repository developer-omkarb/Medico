export interface ChangePasswordRequest{
    userId:number,
    oldPassword:string,
  newPassword?: string,
  attempt?: number
}
