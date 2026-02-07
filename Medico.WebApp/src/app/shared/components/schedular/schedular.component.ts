import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css']
})
export class SchedularComponent implements OnInit {
  loadTabOne:boolean=true
  loadTabTwo:boolean=false
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
  onLoadTabOne(){
    this.loadTabOne=true
    this.loadTabTwo=false
  }
  onLoadTabTwo(){
    this.loadTabOne=false
    this.loadTabTwo=true
  }
}
