import { Component, OnInit } from '@angular/core';
import { SidemenudummyData, SidemenuItem } from 'src/app/shared/models/sidemenu.model';

@Component({
  selector: 'app-dash-board',
  templateUrl:'./dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  sidemenu_items :Array<SidemenuItem> = SidemenudummyData
  constructor() { }

  ngOnInit(): void {
    const userDetails = JSON.parse(sessionStorage.getItem("user"));
    this.sidemenu_items=SidemenudummyData.filter(x=>x.role=="admin");
  }

}
