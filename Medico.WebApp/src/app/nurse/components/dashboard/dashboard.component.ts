import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SidemenudummyData, SidemenuItem } from 'src/app/shared/models/sidemenu.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;
  sidemenu_items :Array<SidemenuItem> = SidemenudummyData

  constructor(private auth: AuthService, private route: Router) {

   }

  ngOnInit(): void {
    console.log(JSON.parse(sessionStorage.getItem("user")).email);
    const userDetails = JSON.parse(sessionStorage.getItem("user"));
    this.username = userDetails.email;
    this.sidemenu_items = SidemenudummyData.filter(x => x.role.toLowerCase() == userDetails.role.toLowerCase());
  }
  //#region  Toggle Side Notification Tab
  openNav(){
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  }
  closeNav(){
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  ontoogleNotifiationTab(shownotificationTab : boolean){
    if(shownotificationTab == true){
      this.openNav()
    }
    else{
      this.closeNav()
    }
  }
  //#endregion
}