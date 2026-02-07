import { Component, OnInit,Input, AfterViewInit } from '@angular/core';
import { AllergyModel } from 'src/app/admin/models/allergy-model';
import { AuthService } from 'src/app/auth.service';
import { AppointmentModel } from '../../../patient/models/appointments-model';


@Component({
  selector: 'app-view-patient-info',
  templateUrl: './view-patient-info.component.html',
  styleUrls: ['./view-patient-info.component.css']
})
export class ViewPatientInfoComponent implements AfterViewInit {
  @Input()
  appointment:AppointmentModel;
  allergyList:AllergyModel[]=[];

  constructor(private auth:AuthService) {
  }
  ngAfterViewInit(): void {
    console.log("Details", this.appointment);
    if (this.appointment.patient.allergies != null) {
      this.appointment.patient.allergies.forEach(id => {
        this.auth.getAllergyById(id).subscribe(res => {
          this.allergyList.push(res);
        });
      });
    }
    this.getDoctor();
    this.getNurse();
    console.log("AAPPT with doctor", this.appointment);
  }
   getDoctor(){
     this.auth.getDemographicDetailsById(this.appointment.physician.employeeid).subscribe(res=>{
       this.appointment.doctorname=res.firstname + " "+res.lastname;
     });
  }
  getNurse() {
    this.auth.getDemographicDetailsById(this.appointment.nurse.employeeid).subscribe(res => {
      this.appointment.nursename = res.firstname + " " + res.lastname;
    });
  }
}
