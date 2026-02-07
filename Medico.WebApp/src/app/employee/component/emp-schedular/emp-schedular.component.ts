import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-schedular',
  templateUrl: './emp-schedular.component.html',
  styleUrls: ['./emp-schedular.component.css']
})
export class EmpSchedularComponent implements OnInit {
  searchTextVal:any
  searchDrpDwnVal:any
  searchDateVal:any
  constructor() { }

  ngOnInit(): void {
  }
  getSearchedInfo(searchInfo:any){
    this.searchTextVal = searchInfo[0]
    this.searchDrpDwnVal = searchInfo[1]
    this.searchDateVal=searchInfo[2]
  }

}
