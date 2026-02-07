import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidemenuItem } from '../../models/sidemenu.model';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  
  @Input() sidemenu_items : Array<SidemenuItem> = []
  
  constructor(private route:Router) {
  
   }

  ngOnInit(): void {
  }
  logOut() {
    sessionStorage.clear();
    this.route.navigate(['/user/login']);
  }
}
