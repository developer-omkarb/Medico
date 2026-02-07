export interface SidemenuItem {
    username: string
    itemname :string
    icon_class : string
    link:string
    click:string
    role:string
  }
  export const SidemenudummyData : Array<SidemenuItem> =[
    {
        username : "",
        itemname : "Home",
        icon_class: "fas fa-qrcode",
        link : "/patient/dashboard/home",
        click:"",
        role:"patient"
    },
    {
        username : "", 
        itemname : "Book Appointment",
        icon_class: "far fa-calendar",
        link : "/patient/dashboard/schedular",
        click:"",
        role:"patient"
    },
    {
        username : "",
        itemname : "My Visits",
        icon_class: "fas fa-calendar-week",
        link : "/patient/dashboard/appointments",
        click:"",
        role:"patient"

    },
    
    
    {
      username: "",
      itemname: "Home",
      icon_class: "fas fa-qrcode",
      link: "/admin/dashboard/home",
      click: "",
      role: "admin"
    },
    {
      username: "",
      itemname: "Employees",
      icon_class: "fas fa-qrcode",
      link: "admin/dashboard/userlist",
      click: "",
      role: "admin"
    },
    {
      username: "",
      itemname: "Patients",
      icon_class: "fas fa-qrcode",
      link: "admin/dashboard/patientuserlist",
      click: "",
      role: "admin"

    },
    {
      username: "",
      itemname: "Allergy",
      icon_class: "fas fa-qrcode",
      link: "/admin/dashboard/allergy",
      click: "",
      role: "admin"
    },
    {
      username: "",
      itemname: "Diagnosis",
      icon_class: "fas fa-qrcode",
      link: "/admin/dashboard/diagnosis",
      click: "",
      role: "admin"
    },
    {
      username: "",
      itemname: "Procedure",
      icon_class: "fas fa-qrcode",
      link: "/admin/dashboard/procedure",
      click: "",
      role: "admin"
    },
    {
      username: "",
      itemname: "Medicine",
      icon_class: "fas fa-qrcode",
      link: "/admin/dashboard/medicine",
      click: "",
      role: "admin"
    },
    {
      username: "",
      itemname: "Vital Signs",
      icon_class: "fas fa-qrcode",
      link: "/admin/dashboard/vitalsign",
      click: "",
      role: "admin"
    },
    {
      username: "",
      itemname: "Home",
      icon_class: "fas fa-qrcode",
      link: "/nurse/dashboard/home",
      click: "",
      role: "nurse"
    },
    {
      username: "",
      itemname: "Appointment",
      icon_class: "fas fa-qrcode",
      link: "/nurse/dashboard/schedular",
      click: "",
      role: "nurse"
    },
    {
      username: "",
      itemname: "Register Patient",
      icon_class: "fas fa-qrcode",
      link: "/nurse/dashboard/home",
      click: "",
      role: "nurse"
    },
    {
      username: "",
      itemname: "Home",
      icon_class: "fas fa-qrcode",
      link: "/physician/dashboard/home",
      click: "",
      role: "physician"
    },
    {
      username: "",
      itemname: "Calender",
      icon_class: "fas fa-qrcode",
      link: "/physician/viewschedule",
      click: "",
      role: "physician"
    }

]
