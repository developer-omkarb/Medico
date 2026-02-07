import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { getterForProp } from '@swimlane/ngx-datatable';
import { BaseChartDirective } from 'angular-bootstrap-md';
import { AuthService } from 'src/app/auth.service';
import { ResponseModel } from 'src/app/user/models/response-model';
import { Purpose } from '../../models/purpose.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit{
    @Input()
    usersCount:number[];

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    
    chartType = 'pie';
    
  chartDatasets:any=[
    { data: [], 
      label: '' }
  ];

  chartLabels = ['Physicians', 'Nurses', 'Admins'];

  chartColors = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };
    constructor(){
    }
  ngOnInit(): void {
      setTimeout(() => {
        this.chart.chart.data.datasets[0].data = this.usersCount as any[];
        this.chart.chart.update()
    }, 500);
    }
}
