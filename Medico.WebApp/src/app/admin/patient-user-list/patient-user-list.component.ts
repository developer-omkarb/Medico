import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { DialCodeModel, Employee, Person, RoleModel, TitleModel, UserModel } from 'src/app/user/models/user-model';
import { AuthService } from 'src/app/auth.service';
import { UtilService } from 'src/app/shared/service/utility.service';


import { DatatableComponent } from '@swimlane/ngx-datatable';

import {UsersListModel } from '../models/hospital-user-model';

declare var $: any;


@Component({
  selector: 'app-patient-user-list.component',
  templateUrl: './patient-user-list.component.html',
  styleUrls: ['./patient-user-list.component.css']
})
export class PatientUserListComponent implements OnInit {
  @Input()
  users: UsersListModel[];
  temp: any = [];
  rows: any = [];
  totalCount: Number = 0;
  closeResult: string;
  user: UsersListModel[] = [];
  userData: any;
  isEditable: boolean = false;
  result: any;
  userTemp: UsersListModel[];
 

  @ViewChild('apptTable') aaptTable: DatatableComponent;

  dataParams: any = {
    page_num: '',
    page_size: ''
  };

  showPopUp: boolean;

  constructor(private authSrvc: AuthService, private route: Router, private util: UtilService) { }
  ngOnInit(): void {
    this.dataParams.page_num = 1;
    this.dataParams.page_size = 10;
    this.getUsers();
   
    this.totalCount = 8;
  }



  getUsers() {
    this.authSrvc.getPatientUsers().subscribe(res => {
      this.userTemp = res;
      this.users = res;
      this.rows = this.users;
      this.temp = this.rows;
    
        });

 
  }

  

 closePopUp(event:any)

 {
   this.showPopUp = false;

    }
  
  editUser(value) {

    this.user = value;

  
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
    this.authSrvc.manageUser(user.userid, statusTobeUpdated,'','').subscribe(res => {
      this.result = res;
      if (this.result) {
        this.util.showSuccess("User activated successfully. ")
        this.getUsers();
      }
    });
  }

  DeactivateUser(user) {
    var statusTobeUpdated = 2;
    this.authSrvc.manageUser(user.userid, statusTobeUpdated,'','').subscribe(res => {
      this.result = res;
      if (this.result) {
        this.util.showSuccess("User deactivated successfully. ")
        this.getUsers();
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

  Search(event) {

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
