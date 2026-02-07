export class UserModel {
  userId: number;
  personId: number;
  email: string;
  roleId: number;
  password?: string;
  TitleId?: number;
  employeeID?: number;
  lastChangedPasswordOn: string;
  isLocked: boolean;
  createdBy: string;
  createdDate: Date;
  modifiedBy?: string;
  modifiedDate: Date;
  employee: Employee;
  person: Person;
  loginHistory: LoginHistory[];
  patient: Patient[] = [];
}

export class Employee {
  employeeid?: number;
  code: string;
  departmentId?: number;
  Spacilities: any[] = [];
  createdBy: string;
  createdDate: Date;
  modifiedBy?: string;
  modifiedDate: Date;
  experience: number;
  worklocation: string;
  user: UserModel[];
}
export class Person {
  personid: number;
  titleid: number;
  firstname: string;
  lastname: string;
  dob: Date;
  gender: string;
  cityId: number;
  race?: string;
  ethnicity: string;
  languageKnown: [];
  email: string;
  contactnumber: string;
  dialcode: string;
  address: string;
}

export class Patient {
  patientId: number;
  personId: number;
  userId: number;
  allergies: [];
  emergencyContacts: [];
  person: Person;
  User: UserModel[];
}
export interface LoginHistory {
  id?: string,
  userid: string,
  ipAddress: string,
  logindatetime: Date,
  loggedOutAt: Date,
  loginAttempts: number
}
export interface TitleModel {
  titleid: number,
  value: string
}
export interface DialCodeModel {
  dialcodeid: number
  countryid: number,
  dialcode: number
}
export interface RoleModel {
  roleid: number
  code: string,
  name: string
}
