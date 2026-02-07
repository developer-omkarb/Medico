export interface Login {
  username: string,
  password: string,
}
export interface ChangePassword {
  userId: string,
  oldPassword: string,
  newPassword: string
}
