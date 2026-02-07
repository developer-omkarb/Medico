import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-dashboardcardsbar',
  templateUrl: './dashboardcardsbar.component.html',
  styleUrls: ['./dashboardcardsbar.component.css']
})
export class DashboardcardsbarComponent implements OnInit {
  nursedashboardcardsInfo : any
  constructor(private authService:AuthService) 
  { }

  ngOnInit(): void {
    this.authService.nursedashboardcardsInfo().subscribe((res:Array<any>)=>{
      this.nursedashboardcardsInfo = res
    })
  }

}
