import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';
import { UsersListModel } from '../../models/hospital-user-model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ResponseModel } from '../../../user/models/response-model';
import { sha256 } from 'js-sha256';
declare var $: any;


@Component({
  selector: 'app-user-list.component',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input()
  users: UsersListModel[];
  temp: any = [];
  rows: any = [];
  totalCount: Number = 0;
  closeResult: string;
  user: UsersListModel[] = [];
  userData: any;
  result: any;
  userTemp: UsersListModel[];

 

  @ViewChild('apptTable') aaptTable: DatatableComponent;

  dataParams: any = {
    page_num: '',
    page_size: ''
  };

  showPopUp: boolean;

  constructor(private authSrvc: AuthService, private route: Router,private util: UtilService) { }
  ngOnInit(): void {
    this.dataParams.page_num = 1;
    this.dataParams.page_size = 10;
    this.getUsers();
   
    this.totalCount = 8;
  }



  getUsers() {
    this.authSrvc.getHospitalUsers().subscribe(res => {
      this.userTemp = res;
      this.users = res;

      this.rows = this.users;
      this.temp = this.rows;
    
        });
 }

  

  closePopUp(response: ResponseModel)

 {
    this.showPopUp = false;
    if (!response.isError) {
      this.getUsers();
      this.util.showSuccess(response.Message);
    }
    else {
      this.util.showDanger(response.Message);
    }
  
     
    
 
  }

  
  
  editUser(value) {

    this.user = value;

    console.log(value.userid);
    this.authSrvc.getUser(value.userid).subscribe(res => {
      this.userData = res;
      this.showPopUp = true;
     });
  }

  addUser() {
    this.showPopUp = true;
    this.userData = null;
  }

ActivateUser(user) {
    var statusTobeUpdated = 1;
    this.authSrvc.GetRandomStringFromAPI().subscribe((randomstring:any)=>{
      console.log('GOT DATA',randomstring)
      let pass =sha256(randomstring.value)
      this.authSrvc.manageUser(user.userid, statusTobeUpdated,pass,randomstring.value).subscribe(res => {
        this.result = res;
        if (this.result) {
          this.util.showSuccess("User activated successfully. ")
          this.getUsers();
        }
      })
    },error=>{console.log(error)})
    ;
  }


  DeactivateUser(user) {
    var statusTobeUpdated = 2;
    this.authSrvc.manageUser(user.userid, statusTobeUpdated,'','').subscribe(res => {
      this.result = res;
      if (this.result) {
        this.getUsers();
        this.util.showSuccess("User deactivated successfully. ")
      }
    });
  }

  BlockUser(user) {
    var statusTobeUpdated = 3;
    this.authSrvc.manageUser(user.userid, statusTobeUpdated,'','').subscribe(res => {
      this.result = res;
      if (this.result) {
        this.getUsers();
      }
    });
  }

  searchTextChanged(event) {
    //if (this.users.length != 0 && (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90)) {
    //  this.users = this.users.filter(x => (x.name.includes(event.key)) || x.userid.toString().includes(event.key));
    //}
    //else {
    //  this.users = this.userTemp;
    //}
    this.users = this.userTemp;
    this.users = this.users.filter(x => (
      x.name.toUpperCase().includes(event.toUpperCase())) || (x.userid.toString().includes(event)));
  }

}
