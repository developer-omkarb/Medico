import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AdminHomeCards } from '../../models/admin-dashboard-cards';
import { Purpose } from '../../models/purpose.model';

@Component({
  selector: 'app-count-panel',
  templateUrl: './count-panel.component.html',
  styleUrls: ['./count-panel.component.css']
})
export class CountPanelComponent implements OnInit {
  countArray: Array<AdminHomeCards>=[];
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.getTotalCount();
  }

  getTotalCount(){
    this.auth.getTotalUserCount(1).subscribe((res:any)=>{
          const cardDetails: AdminHomeCards = {
            count: parseInt(res.message),
            heading: "Total Patients",
            imgUrl:"../../../../assets/images/people.png"
          };
          this.countArray.push(cardDetails);
        });
      this.auth.getTotalUserCount(3).subscribe((res:any)=>{
        const cardDetails: AdminHomeCards = {
          count: parseInt(res.message),
          heading: "Total Nurses",
          imgUrl: "../../../../assets/images/nurse.png"
        };
        this.countArray.push(cardDetails);
    });
      this.auth.getTotalUserCount(2).subscribe((res:any)=>{
        const cardDetails: AdminHomeCards = {
          count: parseInt(res.message),
          heading: "Total Physicians",
          imgUrl: "../../../../assets/images/physician.png"
        };
        this.countArray.push(cardDetails);
      });
    this.auth.getTotalAppintmentCount(false).subscribe((res: any) => {
        const cardDetails: AdminHomeCards = {
          count: parseInt(res.message),
          heading: "Total Appointments",
          imgUrl: "../../../../assets/images/appointment.png"
        };
        this.countArray.push(cardDetails);
      });
  }

}
