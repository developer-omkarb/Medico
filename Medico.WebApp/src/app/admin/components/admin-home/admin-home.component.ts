import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'angular-bootstrap-md';
import { AuthService } from 'src/app/auth.service';
import { Appointmnents } from 'src/app/patient/models/appointments-model';
import { Purpose } from 'src/app/shared/models/purpose.model';

enum Months{
  'January'=1, 
  'February'=2,
   'March'=3,
    'April'=4,
     'May'=5,
      'June'=6,
       'July'=7,
       'August'=8,
       'September'=9,
       'October'=10,
       'November'=11,
       'December'=12
}


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  readonly purposeEnum=Purpose;
  userTypeCount:number[]=[];
  appointments:Appointmnents[];
  monthlyCount:number[]=[];
  chartType = 'line';

  chartDatasets:any=[
    { data: [], 
      label: 'Appointments Analysis 2022' }
  ];

  chartLabels:string[] = [];

  chartColors = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any) {
    console.log(event);
  }

  chartHovered(event: any) {
    console.log(event);
  }
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    let currentMonth=(new Date()).getMonth()+1;
    let i:number=1;
    for(i=1;i<=currentMonth;i++)
    {
      this.chartLabels.push(Months[i]);
    }
    this.prepareArrayForPieChart();
    this.getAppointmentsList();
    
    //this.chartDatasets.push({data:[0,0,2],label:"Appointment Analysis "+(new Date()).getFullYear()});
    //this.monthlyCount.forEach(val => this.chartDatasets[0].data.push(Object.assign({}, val)));
    //this.chartDatasets[0].data=[...this.monthlyCount];
  }
  getAppointmentsList(){
    this.auth.getAppointmentsList().subscribe((list:Appointmnents[])=>{
      this.appointments=list as Appointmnents[];
      this.chartLabels.forEach(item=>{
        if(this.appointments.filter(x=>Months[(new Date(x.createddate)).getMonth()+1]==item).length!=0)
        {
          let appt=this.appointments.filter(x=>Months[(new Date(x.createddate)).getMonth()+1]==item);
          this.monthlyCount.push(appt.length);
        }
        else{
          this.monthlyCount.push(0);
        }
      });
      setTimeout(() => {
        this.chart.chart.data.datasets[0].data = this.monthlyCount as any[];
        this.chart.chart.update()
    }, 500);
    });
  }
  prepareArrayForPieChart()
  {
    this.auth.getUserList().subscribe((res:any[]) => {
      let adminCount = res.filter(x => x.roleid === 4).length;
      let physicianCount = res.filter(x => x.roleid === 2).length;
      let nurseCount = res.filter(x => x.roleid === 3).length;
        this.userTypeCount[0]=physicianCount;
        this.userTypeCount[1]=nurseCount;
        this.userTypeCount[2]=adminCount;
    });
  }
}
