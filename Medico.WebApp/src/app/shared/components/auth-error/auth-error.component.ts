import { Component, OnInit } from '@angular/core';
import { SidemenudummyData, SidemenuItem } from '../../models/sidemenu.model';

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.css']
})
export class AuthErrorComponent implements OnInit {
  sidemenu_items: Array<SidemenuItem> = SidemenudummyData
  constructor() { }

  ngOnInit(): void {
    const userDetails = JSON.parse(sessionStorage.getItem("user"));
    if (userDetails != null) {
      this.sidemenu_items = SidemenudummyData.filter(x => x.role.toLowerCase() == userDetails.role.toLowerCase());
    }
  }

}
