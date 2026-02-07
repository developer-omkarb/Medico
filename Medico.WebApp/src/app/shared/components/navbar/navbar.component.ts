import { AfterViewInit } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SidemenudummyData, SidemenuItem } from '../../models/sidemenu.model';
import { UtilService } from '../../service/utility.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Input() sidemenu_items : Array<SidemenuItem> = []
  @Input() noOfNotifications :number = 0
  @Output() toogleNotifiationTab = new EventEmitter<any>()
  username: string;
  profileLink:string
  changePasswordLink:string
  toogle = false
  showProfile: boolean = true
  showPopUp: boolean = false;
  role:string=""
  constructor(private route: Router,private auth:AuthService,private utilService:UtilService) {
    this.sidemenu_items = SidemenudummyData
    const user = utilService.getUserFromSession()
    if(user.role == "Patient"){
      this.profileLink = "/patient/dashboard/profile"
      this.changePasswordLink = "/user/changePassword"
    }
    else if(user.role == "Nurse" || user.role=="Physician"){
      this.profileLink = "/patient/dashboard/profile"
      this.changePasswordLink = "/user/changePassword"
      this.showProfile = false;
    }
    else if(user.role == "Admin"){
      this.profileLink = "/patient/dashboard/profile"
      this.changePasswordLink = "/user/changePassword"
      this.showProfile = false;
    }
   }

  ngOnInit(): void {
    var userDetails = this.utilService.getUserFromSession()
    this.role = userDetails.role
    this.username = userDetails != null ? userDetails.fullName : "";
  }
  ngAfterViewInit(): void {
    var menuLink = document.getElementById("menuLinks") as HTMLDivElement;
    //this.loopThroughLinks(menuLink, true);
  }
  
  toogleNotifiation(){
    this.toogle = !this.toogle
    this.toogleNotifiationTab.emit(this.toogle);
  }
  logOut(){
    this.auth.logout();
    window.open('/patient/Login', '_self');
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }

  loopThroughLinks(menuLink: HTMLDivElement, isLoad: boolean) {
    if (isLoad == true) {
      //var currentRoute = this.route.url;
      //var homeTag = menuLink.firstChild as HTMLDivElement;
      //console.log("menuLinks", menuLink);
      //var homeLink: HTMLDivElement = homeTag.firstChild as HTMLDivElement;
      ////var homeLink: HTMLAnchorElement = homeDiv.firstChild as HTMLAnchorElement;
      //homeLink.classList.remove("activeLink");
      //homeLink.classList.add("text-info");
    }
    menuLink.childNodes.forEach(element => {

      if (element.childNodes.length != 0) {
        var anchorTag: HTMLAnchorElement = element.firstChild as HTMLAnchorElement;
        if (anchorTag.classList.length == 1) {
          anchorTag.classList.add("nav-link");
          anchorTag.classList.add("link-hover");
        }
        if (anchorTag.classList.contains("activeLink")) {
          anchorTag.classList.remove("activeLink");
          anchorTag.classList.add("text-info");
        }
      }
    });
  }
  onLinkChange(url: string, target: HTMLAnchorElement, menuLink: HTMLDivElement) {
    //var menuLinks: HTMLDivElement = document.getElementById("menuLinks") as HTMLDivElement;
    this.loopThroughLinks(menuLink, false);
    target.classList.remove("text-info");
    target.classList.add("activeLink");
    if (target.innerText == "REGISTER PATIENT") {
      this.showPopUp = true;
    }
    else {
      this.route.navigate([url]);
    }
    
  }

  closePopUp(event: any) {
    this.showPopUp = false;
 }
}
interface ProfileLinks{
  link:string,
  Role:string
}
const profileLinks:Array<ProfileLinks> =[
  {link : "/nurse/dashboard/profile", Role : "Nurse"},
  {link : "/patient/dashboard/profile", Role : "Patient"},
  {link : "/Admin/dashboard/profile", Role : "Admin"}
]
