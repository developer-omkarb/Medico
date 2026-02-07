import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})
export class PatientVisitDetailsComponent implements OnInit {
  active = 1;

  constructor(private route : ActivatedRoute) { }
  appointmentId : number
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.appointmentId = Number(params["id"])
  })

  console.log("ID GETTING FROM APPOINTMENT is:- ", this.appointmentId)
}

}
