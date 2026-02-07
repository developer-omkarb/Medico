import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/user/models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email:string;
  showName:boolean=false;

  constructor() { }

  ngOnInit(): void {
    const userDetails:UserModel = JSON.parse(sessionStorage.getItem("user"));
    if(userDetails!=null)
    {
      this.email = userDetails.email;
      console.log("USERNAME",this.email);
      this.showName=true;
    }
    else
    {
      this.email="";
      this.showName=false;
    }
  }

}
