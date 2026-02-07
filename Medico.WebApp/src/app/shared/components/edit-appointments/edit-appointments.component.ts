import { Component, Input, OnInit } from '@angular/core';
import { PatientAppointmentsViewModel } from 'src/app/patient/models/patientappointmentsview.model';

@Component({
  selector: 'app-edit-appointments',
  templateUrl: './edit-appointments.component.html',
  styleUrls: ['./edit-appointments.component.css']
})
export class EditAppointmentsComponent implements OnInit {
  @Input() tableHeaderText: string = ""
  @Input() allowSearch:boolean = true
  searchText:string=""
  constructor() { }

  ngOnInit(): void {
  }
  searchTextChanged(searchText:string){
    this.searchText = searchText
  }
}
