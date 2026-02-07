

import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Vitals } from '../../models/vitals.model';

@Component({
  selector: 'app-vitalsigns-bar',
  templateUrl: './vitalsigns-bar.component.html',
  styleUrls: ['./vitalsigns-bar.component.css']
})
export class VitalsignsBarComponent implements OnInit {
  patientdashboardcardsInfo : any
  
  constructor(private authService:AuthService) {
   }

  ngOnInit(): void {
    this.authService.patientdashboardcardsInfo().subscribe((res:Array<any>)=>{
      this.patientdashboardcardsInfo = res
    })
  }

}