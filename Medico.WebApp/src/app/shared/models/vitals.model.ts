export interface Vitals {
    name  : string
    value : string
    unit  : string
    iconsrc : string
    updateddate :  string
  }
  export const VitalsdummyData:Array<Vitals>
  = [{
      name : "Height",
      iconsrc : "./../../../../assets/images/height.png",
      value : "142" ,
      unit : "Cm",
      updateddate :"Jul-22"
  },
  {
      name : "Weight",
      iconsrc : "./../../../../assets/images/weight.png",
       value : "67" ,
       unit:"Kg",
        updateddate :"Jul 21"
  },
  {
      name : "Blood Pressure",
      iconsrc : "./../../../../assets/images/bloodpressuredistolic.png",
       value : "202/90" ,
       unit:"mg/dl",
        updateddate :"Jan-21"
  },
  {
      name : "Body Temprature",
      iconsrc : "./../../../../assets/images/bodytemp.png"  ,
      value : "18" ,
      unit:"Calc",
      updateddate :"Today"
  }
  ]