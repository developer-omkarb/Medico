import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { phyinfo } from 'src/app/patient/models/phyinfo.model';

@Component({
  selector: 'app-infinite-scroller',
  templateUrl: './infinite-scroller.component.html',
  styleUrls: ['./infinite-scroller.component.css'],
  template:'<ng-content></ng-content><div #anchor></div>'
})
export class InfiniteScrollerComponent implements OnInit,OnChanges {
  @Input() searchtxtboxval:""
  @Input() searchdrpdownval:""
  @Input() searchDateVal:any
  @Input() phyIdArr : number[] = [];
  searchDate:any
  phyInfoData : Array<phyinfo>=[];
  direction = "";
 constructor(private auth:AuthService) {
  //  this.appendItems();
 }
  ngOnChanges(changes: SimpleChanges): void {
    this.auth.GetPhyInfoBySearch(this.searchtxtboxval,this.searchdrpdownval,0).subscribe((response:Array<phyinfo>)=>{
      this.phyInfoData=[]
      response.forEach(element => {
        this.phyInfoData.push(element)
      });
    })
    console.log('point2',this.searchDateVal)
    this.searchDate = this.searchDateVal
  }

  ngOnInit(): void {
    this.appendItems();
  }


onScrollDown(ev: any) {
  console.log("scrolled down!!", ev);
  // this.appendItems();
  this.direction = "scroll down";
}

appendItems() {
  this.addItems("push");
}

 onScrollUp(ev: any) {
//   console.log("scrolled up!", ev);
//   this.sum -= 20;
//   this.prependItems();

//   this.direction = "scroll up";
// }
// prependItems() {
//   this.addItems("unshift");
}
addItems(_method: string) {

  this.auth.GetPhyInfo().subscribe((response:Array<phyinfo>)=>{
    response.forEach(element => {
      this.phyInfoData.push(element)
    });
  })
  
}
}
