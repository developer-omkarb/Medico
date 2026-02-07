export interface PatientDetailModel {
    patientid: Number,
    personid: Number,
    userid:Number,
    allergies :number[],
    emergencycontacts : Number[],
    allergiesdescription : string[],
    person : PersonModel,
    user : null,
    appointment : null,
    emergencyContInfo : emergencyContactInfoModel[]
  }
  
  export interface PersonModel{
    personid: Number,
    titleid: Number,
    firstname : string,
    lastname: string,
    dob: Date,
    gender: string,
    cityid : Number,
    race :string,
    ethnicity:string,
    languageknown:Number[],
    email:string,
    contactnumber:string,
    dialcode:string,
    address:string,
    age:Number,
    city:null,
    title:null,
    patient:null,
    user:null
  }
  
  
  export interface emergencyContactInfoModel{
    firstname : string,
    lastname : string,
    contactnumber : string,
    relationship :string,
    email :string,
    address:string,
    allowedaccess:boolean,
    dialcode:string,
    title:string,
    patientid:Number,
    patient:null
  }