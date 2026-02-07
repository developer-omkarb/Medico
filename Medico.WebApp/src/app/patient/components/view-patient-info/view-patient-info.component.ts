import { Component, OnInit,Input, AfterViewInit } from '@angular/core';
import { AllergyModel } from 'src/app/admin/models/allergy-model';
import { AuthService } from 'src/app/auth.service';
import { AppointmentModel } from '../../models/appointments-model';

@Component({
  selector: 'app-view-patient-info',
  templateUrl: './view-patient-info.component.html',
  styleUrls: ['./view-patient-info.component.css']
})
export class ViewPatientInfoComponent implements AfterViewInit {
  @Input()
  appointment:AppointmentModel;
  allergyList:AllergyModel[]=[];
  doctorName:string;

  constructor(private auth:AuthService) { }
  ngAfterViewInit(): void {
    console.log("PERSON", this.appointment);
    this.appointment.patient.allergies.forEach(id=>{
        this.auth.getAllergyById(id).subscribe(res=>{
          this.allergyList.push(res);
        });
      });
    this.getDoctor();
    console.log("APPT", this.appointment);
  }
  getDoctor(){
    this.auth.getDemographicDetailsById(this.appointment.physician.employeeid).subscribe(res=>{
      this.doctorName=res.firstname + " "+res.lastname;
    });
  }
}
